## Toptour client

deploy:
1. webpack build -p
2. copy to deploy location
3. add config


ssh-keygen -t rsa -b 4096 -C 'build@travis-ci.org' -f ./deploy_rsa
travis encrypt-file deploy_rsa --add
ssh-copy-id -i deploy_rsa.pub <ssh-user>@<deploy-host>
rm -f deploy_rsa deploy_rsa.pub
git add deploy_rsa.enc .travis.yml