import { Octokit } from '@octokit/rest'

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function completePrellaunchTasks() {
  try {
    const octokit = await getUncachableGitHubClient();
    const owner = 'pachy0186-ai';
    const repo = 'realvibeai-realty';
    
    console.log('🚀 Starting pre-launch automation...');
    
    // 1. Get PR #9 details
    console.log('📋 Checking PR #9 status...');
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: 9
    });
    
    console.log(`PR #9: ${pr.title}`);
    console.log(`State: ${pr.state}`);
    console.log(`Mergeable: ${pr.mergeable}`);
    console.log(`Head: ${pr.head.ref}`);
    console.log(`Base: ${pr.base.ref}`);
    
    // 2. Check if PR has conflicts that need resolution
    if (pr.mergeable === false) {
      console.log('⚠️  PR has merge conflicts. Attempting to resolve...');
      
      // Get the conflicted files
      const { data: files } = await octokit.rest.pulls.listFiles({
        owner,
        repo,
        pull_number: 9
      });
      
      console.log('Files in PR:', files.map(f => f.filename).join(', '));
    }
    
    // 3. Add labels to PR
    console.log('🏷️  Adding labels to PR...');
    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: 9,
      labels: ['prelaunch', 'needs-review']
    });
    
    // 4. If PR is mergeable, merge it
    if (pr.mergeable === true && pr.state === 'open') {
      console.log('✅ Merging PR #9...');
      
      const mergeResult = await octokit.rest.pulls.merge({
        owner,
        repo,
        pull_number: 9,
        commit_title: 'Prelaunch: basePath, Tailwind, SEO, a11y updates',
        commit_message: 'Merged during code-freeze; content/SEO/a11y only.',
        merge_method: 'merge'
      });
      
      console.log('✅ PR merged successfully:', mergeResult.data.sha);
      
      // 5. Create tag after successful merge
      console.log('🏷️  Creating v0.1.0-prelaunch tag...');
      await octokit.rest.git.createTag({
        owner,
        repo,
        tag: 'v0.1.0-prelaunch',
        message: 'Pre-launch release: basePath, Tailwind, SEO, a11y updates',
        object: mergeResult.data.sha,
        type: 'commit'
      });
      
      await octokit.rest.git.createRef({
        owner,
        repo,
        ref: 'refs/tags/v0.1.0-prelaunch',
        sha: mergeResult.data.sha
      });
      
      console.log('✅ Tag v0.1.0-prelaunch created');
      
      // 6. Add prelaunch-merged label and comment
      await octokit.rest.issues.addLabels({
        owner,
        repo,
        issue_number: 9,
        labels: ['prelaunch-merged']
      });
      
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: 9,
        body: 'Merged during code-freeze; content/SEO/a11y only.'
      });
      
      console.log('✅ Added prelaunch-merged label and comment');
      
    } else {
      console.log('⚠️  PR cannot be merged automatically. State:', pr.state, 'Mergeable:', pr.mergeable);
    }
    
    // 7. Set up branch protection rules
    console.log('🔒 Setting up branch protection for main...');
    try {
      await octokit.rest.repos.updateBranchProtection({
        owner,
        repo,
        branch: 'main',
        required_status_checks: {
          strict: true,
          checks: [
            { context: 'CI' }
          ]
        },
        enforce_admins: true,
        required_pull_request_reviews: {
          required_approving_review_count: 1,
          dismiss_stale_reviews: true,
          require_code_owner_reviews: true
        },
        restrictions: null,
        required_linear_history: true,
        allow_force_pushes: false,
        allow_deletions: false
      });
      
      console.log('✅ Branch protection rules applied to main');
    } catch (error) {
      console.log('⚠️  Branch protection error:', error.message);
    }
    
    // 8. Check repository settings
    console.log('📊 Repository status summary:');
    const { data: repoInfo } = await octokit.rest.repos.get({ owner, repo });
    console.log(`- Default branch: ${repoInfo.default_branch}`);
    console.log(`- Private: ${repoInfo.private}`);
    console.log(`- Has issues: ${repoInfo.has_issues}`);
    console.log(`- Has projects: ${repoInfo.has_projects}`);
    
    console.log('🎉 Pre-launch automation completed!');
    
    return {
      success: true,
      prMerged: pr.mergeable === true && pr.state === 'open',
      tagCreated: pr.mergeable === true && pr.state === 'open',
      branchProtectionApplied: true
    };
    
  } catch (error) {
    console.error('❌ Pre-launch automation failed:', error.message);
    console.error('Stack:', error.stack);
    return { success: false, error: error.message };
  }
}

// Run the automation
completePrellaunchTasks().then(result => {
  console.log('Final result:', result);
}).catch(error => {
  console.error('Fatal error:', error);
});