git add .
git commit -m "Fixed the http server"
git push heroku master
heroku restart -a testnodebot
