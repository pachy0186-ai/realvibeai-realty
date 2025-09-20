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
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function tryDifferentMergeStrategies() {
  try {
    const octokit = await getUncachableGitHubClient();
    const owner = 'pachy0186-ai';
    const repo = 'realvibeai-realty';
    
    console.log('🔄 Trying different merge strategies...');
    
    // Try squash merge first
    try {
      console.log('🔄 Attempting squash merge...');
      const squashResult = await octokit.rest.pulls.merge({
        owner,
        repo,
        pull_number: 9,
        commit_title: 'Prelaunch: basePath, Tailwind, SEO, a11y updates',
        commit_message: 'Merged during code-freeze; content/SEO/a11y only.',
        merge_method: 'squash'
      });
      
      console.log('✅ Squash merge successful:', squashResult.data.sha);
      return { success: true, method: 'squash', sha: squashResult.data.sha };
      
    } catch (squashError) {
      console.log('❌ Squash merge failed:', squashError.message);
      
      // Try rebase merge
      try {
        console.log('🔄 Attempting rebase merge...');
        const rebaseResult = await octokit.rest.pulls.merge({
          owner,
          repo,
          pull_number: 9,
          commit_title: 'Prelaunch: basePath, Tailwind, SEO, a11y updates',
          commit_message: 'Merged during code-freeze; content/SEO/a11y only.',
          merge_method: 'rebase'
        });
        
        console.log('✅ Rebase merge successful:', rebaseResult.data.sha);
        return { success: true, method: 'rebase', sha: rebaseResult.data.sha };
        
      } catch (rebaseError) {
        console.log('❌ Rebase merge failed:', rebaseError.message);
        return { success: false, error: 'All merge methods failed' };
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function completeMergeAndTag() {
  const mergeResult = await tryDifferentMergeStrategies();
  
  if (mergeResult.success) {
    try {
      const octokit = await getUncachableGitHubClient();
      const owner = 'pachy0186-ai';
      const repo = 'realvibeai-realty';
      
      // Create tag
      console.log('🏷️  Creating v0.1.0-prelaunch tag...');
      await octokit.rest.git.createTag({
        owner,
        repo,
        tag: 'v0.1.0-prelaunch',
        message: 'Pre-launch release: basePath, Tailwind, SEO, a11y updates',
        object: mergeResult.sha,
        type: 'commit'
      });
      
      await octokit.rest.git.createRef({
        owner,
        repo,
        ref: 'refs/tags/v0.1.0-prelaunch',
        sha: mergeResult.sha
      });
      
      console.log('✅ Tag v0.1.0-prelaunch created');
      
      // Add merged label and comment
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
      
      // Set up branch protection
      console.log('🔒 Setting up branch protection...');
      await octokit.rest.repos.updateBranchProtection({
        owner,
        repo,
        branch: 'main',
        required_status_checks: {
          strict: true,
          checks: []
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
      
      console.log('✅ Branch protection applied');
      
      console.log('🎉 ALL PRE-LAUNCH TASKS COMPLETED!');
      return { success: true, allTasksComplete: true };
      
    } catch (error) {
      console.error('❌ Post-merge tasks failed:', error.message);
      return { success: true, mergeComplete: true, postMergeFailed: true };
    }
  }
  
  return mergeResult;
}

completeMergeAndTag().then(result => {
  console.log('🎯 Final result:', result);
}).catch(error => {
  console.error('❌ Fatal error:', error);
});