$pages = @(
    "Home", "Login", "Register", "ForgotPassword", "Dashboard", 
    "ResumeAnalyzer", "JobMatcher", "MockInterview", "Reports", "Profile", "NotFound"
)

foreach ($page in $pages) {
    $content = @"
import React from 'react';

const $page = () => {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">$page Page Placeholder</h1>
    </div>
  );
};

export default $page;
"@
    Set-Content -Path "client/src/pages/$page.jsx" -Value $content -Force
}
