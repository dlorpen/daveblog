# Using a git hook to build on push to the server

So my internet's a bit crap at the moment. I decided I can't be transferring a ~100 megabyte file across the wire every time I wanna publish some minor random update to my minor random blog, so I went and read some docs ([excellent ones here](https://githooks.com/)), which led me to [this blogpost](http://ryanflorence.com/deploying-websites-with-a-tiny-git-hook/).

The end result was, I created a git repo on the server (just did a `git init`, I didn't want a bare repo 'cos I wanted to checkout the code on the server and build the docker image there).

Next I wrote the following script as a git post-receive hook (I'm glossing over a fair amount of cursing and googling and experimenting here):

```bash

/usr/bin/env bash

echo "Received push"

cd ..
GIT_DIR=".git"
echo "Resetting git from dir: $(pwd)"
git reset --hard
echo "Git reset complete"

./scripts/buildImage.sh

echo "Starting container"
docker-compose -f docker/docker-compose.yml up -d

echo "Container started"
docker container ls

echo "Done"

```

I had to chmod the thing to be executable so that git would run it every time a push to the repo happens:

```bash
chmod +x ./git/hooks/post-receive
```

Then I set the server git repository to be a remote repository on my local repo like so:

```bash
git remote add server ssh://myusername@server:/path-to-repo/.git/
```

This worked OK. Then I made a test commit and pushed to the server and immediately got rejected, on the server I had to set it to accept pushes on the main branch, since if you're not using a bare repo git disallows that by default:

```bash
git config add receive.denyCurrentBranch warn
```

Finally I was able to push to the server and now I build and deploy with a single `git push server` command :) I think it's pretty neat if I do say so myself :)

## Caveats

There are of course some things to watch out for. The script as written will do a build and deploy if _any_ branch is pushed to the server. This isn't a big deal for me, but it might be better to use a different hook to to verify which branch was pushed before building if that's critical...
