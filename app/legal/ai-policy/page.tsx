
import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import { marked } from 'marked';

async function getPolicyContent() {
  const policyPath = path.join(process.cwd(), 'AI_POLICY.md');
  const policyContent = await fs.readFile(policyPath, 'utf8');
  return marked(policyContent);
}

export default async function AIPolicyPage() {
  const content = await getPolicyContent();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

