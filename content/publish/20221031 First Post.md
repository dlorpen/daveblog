# This is my first blog post

Hi :) I'm Dave. I'm a web developer. I've been working as a coder for a long time, but... I still feel like I need to understand how the web works. Side-projects like this allow me to test stuff out and play around :)

This blog is a place for me to write about stuff... kinda just 'cos I want to. It's an experiment.

## How I'm setting up the site

I write the blog posts as `md` files. I use a node script as described in [this guide](http://thecodebarbarian.com/using-vue-as-a-node-js-static-site-generator.html) to convert the md files into html files. The author of the original guide uses Vue to apply styling to his blog, but I decided against the Vue option for now, so the generated stuff looks pretty rough - plain, unstyled HTML. I may start messing around with including a single CSS file at some point.

Next, I'm using [the nginx:alpine docker image](https://hub.docker.com/_/nginx) to create a docker image of the site.

Having created a docker image, I am uploading it to the server without using a docker image repository as explained in [this](https://stackoverflow.com/questions/23935141/how-to-copy-docker-images-from-one-host-to-another-without-using-a-repository) stackoverflow question.

The server is an Ubuntu 20.04 VM running on a [Hetzner](https://accounts.hetzner.com/login) server, they're great :) I'm sure there are other providers out there who're equally great, but I find them cheap :) The server is running [`ufw` as a firewall](https://www.howtogeek.com/devops/how-to-secure-your-linux-server-with-a-ufw-firewall/) with port 443 exposed, so that https connections can be made to the server.

In order to run the container on the server I use docker compose as described [here](https://docs.docker.com/compose/production/).

I am using [letsencrypt with certbot]() to give me a free SSL certificate for the [daveorpen.com](daveorpen.com) domain.

And that's pretty much it. Link to the github repo is [here](https://github.com/dlorpen/daveblog) for anyone who's interested :)
