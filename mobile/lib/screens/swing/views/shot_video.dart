import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:rangex/screens/swing/widgets/select_speed.dart';
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
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          /// 비디오
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AspectRatio(
                aspectRatio: 3.0 / 4.0,
                child: VideoPlayer(_controller),
              ),
            ],
          ),

          /// 상단바
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: AppBar(
              leading: IconButton(
                onPressed: () => context.router.pop(),
                icon: const Icon((Icons.arrow_back)),
              ),
              actions: [
                IconButton(
                  onPressed: () {},
                  icon: const Icon(Icons.download_rounded),
                )
              ],
              backgroundColor: Colors.transparent,
              systemOverlayStyle: SystemUiOverlayStyle.light,
            ),
          ),

          /// 비디오 컨트롤러
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                    colors: <Color>[Colors.black, Colors.transparent],
                    end: Alignment.topCenter,
                    begin: Alignment.bottomCenter),
              ),
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SelectSpeed(videoPlayerController: _controller),
                        Row(
                          children: [
                            IconButton(
                              onPressed: () async {
                                final curPos = await _controller.position;

                                if (curPos != null) {
                                  final toPos =
                                      curPos - const Duration(milliseconds: 50);

                                  setState(() {
                                    _controller.seekTo(toPos);
                                  });
                                }
                              },
                              icon: const Icon(Icons.fast_rewind),
                            ),
                            IconButton(
                              onPressed: () {
                                setState(() {
                                  _controller.value.isPlaying
                                      ? _controller.pause()
                                      : _controller.play();
                                });
                              },
                              icon: Icon(
                                _controller.value.isPlaying
                                    ? Icons.pause
                                    : Icons.play_arrow,
                              ),
                            ),
                            IconButton(
                              onPressed: () async {
                                final curPos = await _controller.position;

                                if (curPos != null) {
                                  final toPos =
                                      curPos + const Duration(milliseconds: 50);

                                  setState(() {
                                    _controller.seekTo(toPos);
                                  });
                                }
                              },
                              icon: const Icon(Icons.fast_forward),
                            )
                          ],
                        )
                      ],
                    ),
                    Slider(
                      value: 10,
                      max: 100,
                      divisions: 5,
                      onChanged: (value) {},
                    )
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
