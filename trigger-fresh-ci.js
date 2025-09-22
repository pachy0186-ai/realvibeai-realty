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

async function triggerFreshCI() {
  try {
    const octokit = await new (await import('@octokit/rest')).Octokit({ auth: await getAccessToken() });
    const owner = 'pachy0186-ai';
    const repo = 'realvibeai-realty';
    
    console.log('🔄 Triggering fresh CI run for PR #9...');
    
    // Get PR details
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: 9
    });
    
    console.log(`PR head: ${pr.head.ref} (${pr.head.sha})`);
    
    // Get existing workflow runs for this PR
    const { data: runs } = await octokit.rest.actions.listWorkflowRunsForRepo({
      owner,
      repo,
      head_sha: pr.head.sha,
      per_page: 5
    });
    
    console.log('🔍 Recent workflow runs:');
    runs.workflow_runs.forEach(run => {
      console.log(`- ${run.name}: ${run.status} (${run.conclusion}) - ${run.head_sha.substring(0, 7)}`);
    });
    
    // Try to re-run the most recent CI workflow
    const ciRun = runs.workflow_runs.find(run => run.name === 'CI' || run.name === 'ci.lym');
    
    if (ciRun) {
      console.log(`🔄 Re-running workflow: ${ciRun.name} (ID: ${ciRun.id})`);
      
      try {
        await octokit.rest.actions.reRunWorkflow({
          owner,
          repo,
          run_id: ciRun.id
        });
        
        console.log('✅ Successfully triggered workflow re-run');
        console.log('⏳ Wait for the run to complete, then check Settings → Rules for "CI / build (pull_request)"');
        
        return { 
          success: true, 
          reRunTriggered: true,
          workflowName: ciRun.name,
          runId: ciRun.id,
          expectedCheckName: 'CI / build (pull_request)'
        };
        
      } catch (rerunError) {
        console.log('⚠️  Could not re-run workflow:', rerunError.message);
        console.log('💡 Alternative: Push a no-op commit or use GitHub UI to re-run');
        
        return { 
          success: false, 
          error: rerunError.message,
          suggestion: 'Use GitHub UI to re-run workflow or push empty commit'
        };
      }
    } else {
      console.log('❌ No CI workflow run found to re-run');
      console.log('💡 The workflow may need to be triggered manually');
      
      return { 
        success: false, 
        error: 'No CI workflow run found',
        suggestion: 'Workflow change may trigger automatically or use GitHub UI'
      };
    }
    
  } catch (error) {
    console.error('❌ Error triggering CI:', error.message);
    return { success: false, error: error.message };
  }
}

triggerFreshCI().then(result => {
  console.log('\n🎯 Trigger result:', JSON.stringify(result, null, 2));
}).catch(error => {
  console.error('❌ Fatal error:', error);
});