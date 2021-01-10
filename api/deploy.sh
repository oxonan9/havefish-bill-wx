mvn clean package -DskipTests
read -p "项目打包完成，是否发送到服务器 y/n：" answer1
if [ $answer1 = 'y' ]
then
   scp target/account-0.0.1-SNAPSHOT.jar aliyun-hvfish:~/
   echo '--------------------------------SUCCESS----------------------------------------'
fi
