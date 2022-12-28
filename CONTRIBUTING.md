# Contributing

**Working on your first Pull Request?** You can learn how from this _free_
series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Project setup

1.  `Fork` and `Clone` the repo
2.  Run `yarn install` to install dependencies
3.  Create a branch for your pull request (see
    [PULL_REQUEST_TEMPLATE](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/.github/PULL_REQUEST_TEMPLATE.md))

> Tip: Keep your `main` branch pointing at the original repository and make pull
> requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/ciceksepetitech/cactus-ui.git
> git fetch upstream
> git branch --set-upstream-to=upstream/main main
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `main` branch
> to use the upstream main branch whenever you run `git pull`. Then you can make
> all of your pull request branches based on this `main` branch. Whenever you
> want to update your version of `main`, do a regular `git pull`.

## Committing and Pushing changes

Please make sure to run the tests before you commit your changes. You can run
`yarn test`

## Help needed

Please checkout the [open issues][issues]

[issues]: https://github.com/ciceksepetitech/cactus-ui/issues
