import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class SelectSpeed extends StatefulWidget {
  SelectSpeed({Key? key, VideoPlayerController? videoPlayerController})
      : videoCtrler = videoPlayerController,
        super(key: key);

  VideoPlayerController? videoCtrler;

  @override
  State<SelectSpeed> createState() => _SelectSpeedState();
}

class _SelectSpeedState extends State<SelectSpeed> {
  final playSpeeds = [0.8, 1.0, 1.2, 1.4];
  dynamic currentPlaySpeed = 0.8;

  @override
  Widget build(BuildContext context) {
    return DropdownButton(
      value: currentPlaySpeed,
      items: playSpeeds
          .map((speed) => DropdownMenuItem(
                child: Text(speed.toString()),
                value: speed,
              ))
          .toList(),
      onChanged: (value) {
        setState(() {
          currentPlaySpeed = value;

          print(value);

          widget.videoCtrler?.setPlaybackSpeed(4.0);
        });
      },
    );
  }
}
