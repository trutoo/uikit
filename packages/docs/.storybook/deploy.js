const ghpages = require('gh-pages');
const Git = require('gh-pages/lib/git');
const parse = require('parse-github-url');

const git = new Git(process.cwd(), 'git');
const metadata = require('../package.json');

const main = async () => {
  try {
    if (!process.env.GITHUB_ACTOR)
      throw new Error('You must specify an actor whom performs the commit using GITHUB_ACTOR env variable');
    if (!process.env.GITHUB_TOKEN)
      throw new Error('You must specify a token authenticating the commit using GITHUB_TOKEN env variable');

    console.log('Determining origin url');
    const origin = await git.getRemoteUrl('origin');

    const { host, repo } = parse(origin);
    const url = `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@${host}/${repo}`;

    console.log(`Publishing documentation to ${url} gh-pages branch`);
    await new Promise((resolve, reject) => {
      ghpages.publish(
        'dist',
        {
          repo: url,
          message: `chore(release): documentation v${metadata.version}`,
        },
        err => {
          if (err) reject(err);
          resolve();
        },
      );
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

main()
  .then(() => {
    console.log(`Sucessfully published documentation to GitHub Pages`);
  })
  .catch(() => {
    console.error(`Failed to publish documentation to GitHub Pages`);
    process.exit(1);
  });
