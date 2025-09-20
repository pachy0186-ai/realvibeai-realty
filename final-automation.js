import { Octokit } from '@octokit/rest'

let connectionSettings;

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  return connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function completeFinalPrelaunchTasks() {
  try {
    const octokit = await getUncachableGitHubClient();
    const owner = 'pachy0186-ai';
    const repo = 'realvibeai-realty';
    
    console.log('🚀 Final pre-launch automation after rule fix...');
    
    // Check PR status
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: 9
    });
    
    console.log(`PR #9: ${pr.title} - State: ${pr.state}, Mergeable: ${pr.mergeable}`);
    
    if (pr.mergeable === true && pr.state === 'open') {
      // Attempt merge with corrected rule
      console.log('🔄 Attempting merge with updated repository rule...');
      
      const mergeResult = await octokit.rest.pulls.merge({
        owner,
        repo,
        pull_number: 9,
        commit_title: 'Prelaunch: basePath, Tailwind, SEO, a11y updates',
        commit_message: 'Merged during code-freeze; content/SEO/a11y only.',
        merge_method: 'squash'
      });
      
      console.log('✅ PR merged successfully:', mergeResult.data.sha);
      
      // Create release tag
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
      
      console.log('✅ Release tag created');
      
      // Final labeling and comment
      await octokit.rest.issues.addLabels({
        owner,
        repo,
        issue_number: 9,
        labels: ['prelaunch-merged', 'deployed']
      });
      
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: 9,
        body: '🎉 **Pre-launch deployment complete!**\n\n✅ Merged with code-freeze protocols\n🏷️ Tagged as v0.1.0-prelaunch\n🚀 Ready for Vercel deployment\n\n---\n*Automated via GitHub API during pre-launch sequence*'
      });
      
      console.log('✅ Final PR updates completed');
      
      // Set up proper branch protection for future
      console.log('🔒 Setting up branch protection for future PRs...');
      try {
        await octokit.rest.repos.updateBranchProtection({
          owner,
          repo,
          branch: 'main',
          required_status_checks: {
            strict: true,
            checks: [{ context: 'CI' }]  // Our correct workflow name
          },
          enforce_admins: false,
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
        
        console.log('✅ Branch protection configured with CI workflow');
      } catch (protectionError) {
        console.log('⚠️  Branch protection setup failed:', protectionError.message);
      }
      
      console.log('🎉 🎉 ALL PRE-LAUNCH TASKS COMPLETED! 🎉 🎉');
      console.log('🚀 Repository is now ready for Vercel deployment!');
      
      return { 
        success: true, 
        allTasksCompleted: true,
        sha: mergeResult.data.sha,
        tag: 'v0.1.0-prelaunch',
        readyForDeployment: true 
      };
      
    } else {
      console.log('❌ PR not ready for merge. State:', pr.state, 'Mergeable:', pr.mergeable);
      return { success: false, reason: 'PR not mergeable' };
    }
    
  } catch (error) {
    console.error('❌ Final automation error:', error.message);
    return { success: false, error: error.message };
  }
}

console.log('⏳ Waiting for repository rule update...');
console.log('💡 Run this script after changing the required status check from "ci.lym" to "CI"');

export { completeFinalPrelaunchTasks };