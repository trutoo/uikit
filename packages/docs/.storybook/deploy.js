const ghpages = require('gh-pages');
const Git = require('gh-pages/lib/git');
const argv = require('minimist')(process.argv.slice(2));
const gitParse = require('git-url-parse');

const git = new Git(process.cwd(), 'git');
const metadata = require('../package.json');

const main = async () => {
  if (!process.env.GITHUB_ACTOR)
    throw new Error('You must specify an actor whom performs the commit using GITHUB_ACTOR env variable');
  if (!process.env.GITHUB_TOKEN)
    throw new Error('You must specify a token authenticating the commit using GITHUB_TOKEN env variable');

  console.log('Determining origin url');
  const origin = await git.getRemoteUrl('origin');

  const { resource, full_name } = gitParse(origin);
  const url = `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@${resource}/${full_name}.git`;

  console.log(`Publishing documentation to ${url} gh-pages branch`);
  await new Promise((resolve, reject) => {
    ghpages.publish(
      'dist',
      {
        repo: url,
        message: `chore(release): documentation v${metadata.version}`,
      },
      (err) => {
        if (err) reject(err);
        resolve();
      },
    );
  });
};

main()
  .then(() => {
    console.log(`\n\x1b[36mSucessfully published documentation to GitHub Pages\x1b[0m\n`);
  })
  .catch((err) => {
    if (argv.v || argv.verbose) console.error(err);
    console.error(`\n\x1b[31mFailed to publish documentation to GitHub Pages\x1b[0m\n`);
    process.exit(1);
  });
