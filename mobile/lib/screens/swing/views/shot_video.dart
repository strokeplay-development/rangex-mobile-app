import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:video_player/video_player.dart';

class VideoPage extends StatefulWidget {
  const VideoPage({Key? key}) : super(key: key);

  @override
  State<VideoPage> createState() => _VideoPageState();
}

class _VideoPageState extends State<VideoPage> {
  late VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();

    _controller = VideoPlayerController.network(
        "https://rangex-user-video.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Video_2022-11-02-16-02-12.mp4")
      ..initialize();

    _controller.setLooping(true);
    _controller.play();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.download_rounded))
        ],
        systemOverlayStyle: SystemUiOverlayStyle.light,
      ),
      body: Container(child: VideoPlayer(_controller)),
    );
  }
}
