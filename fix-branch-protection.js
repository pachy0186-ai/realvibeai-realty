import { Octokit } from '@octokit/rest'

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  const connectionSettings = await fetch(
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

async function fixBranchProtection() {
  try {
    const octokit = new Octokit({ auth: await getAccessToken() });
    const owner = 'pachy0186-ai';
    const repo = 'realvibeai-realty';
    
    console.log('🔧 Fixing branch protection to use correct check name...');
    console.log('Changing from: "ci.yml / build (pull_request)"');  
    console.log('To: "CI / build (pull_request)"');
    
    await octokit.rest.repos.updateBranchProtection({
      owner,
      repo,
      branch: 'main',
      required_status_checks: {
        strict: true,
        checks: [{ context: 'CI / build (pull_request)' }]  // Correct check name
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
    
    console.log('✅ Branch protection fixed with correct check: "CI / build (pull_request)"');
    
    return { 
      success: true, 
      fixedCheckName: 'CI / build (pull_request)',
      previousCheckName: 'ci.yml / build (pull_request)'
    };
    
  } catch (error) {
    console.error('❌ Error fixing branch protection:', error.message);
    console.log('⚠️  Branch protection may be managed by repository rulesets instead');
    console.log('Manual fix needed: Settings → Rules → Edit ruleset → Change required check to "CI / build (pull_request)"');
    
    return { success: false, error: error.message };
  }
}

fixBranchProtection().then(result => {
  console.log('🎯 Fix result:', JSON.stringify(result, null, 2));
}).catch(error => {
  console.error('❌ Fatal error:', error);
});