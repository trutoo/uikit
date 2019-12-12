'use strict';
const commit = require('fs').readFileSync(process.env.HUSKY_GIT_PARAMS, 'utf8');

if (/^(merge|chore\(release\))/i.test(commit)) {
  process.exit(0);
}

if (!/^(feat|fix|perf|revert|docs|style|refactor|test|build|ci)(?:\(.+\))?: /.test(commit)) {
  console.warn(
    `Git commit message should lead with a type, followed by an optional scope in parentheses, then a colon, a space, and a message. "feat(typeahead): #1337 added keyboard interaction".`,
  );

  console.warn(`Valid types are feat|fix|perf|revert|docs|style|refactor|test|build|ci.`);

  if (/^(feat|fix)(?:\(.+?\))?: /.test(commit) && !/#\d+/.test(commit)) {
    console.warn(`Features and fixes changes should include a task id.`);
    console.warn(`Example: "feat(typeahead): #1337 added keyboard interaction".`);
  } else {
    console.warn(`Example: "ci(changelog): build step added for conventional changelogs".`);
  }

  process.exit(1337);
}
