# middleman-sender

##Usage

To call this use 

```
http://ec2-52-17-7-182.eu-west-1.compute.amazonaws.com:3000/sender-sms?to=<to_number>&content=<content>
```

## Building

```
docker build -t onedottwo/middleman-sender .
docker push onefottwo/middleman-sender
docker run -d -h sender -p 4000:4000 onedottwo/middleman-sender
```
