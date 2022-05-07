import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User extends Equatable {
  const User({
    required this.userAccount,
    required this.name,
    this.userPW,
    this.id,
    this.level,
    this.nickName,
    this.email,
    this.dialingCode,
    this.phoneNumber,
    this.birthday,
    this.gender,
    this.address1,
    this.address2,
    this.zipCode,
    this.lastLoginDate,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);

  final String userAccount;
  final String name;

  final int? id;
  final int? level;
  final String? userPW;
  final String? nickName;
  final String? email;
  final String? dialingCode;
  final String? phoneNumber;
  final String? birthday;
  final int? gender; // 0: 남자, 1: 여자
  final String? address1;
  final String? address2;
  final String? zipCode;
  final String? lastLoginDate;

  /// 알 수 없는 사용자 생성
  static const unknown =
      User(id: 0, level: 0, userAccount: 'unknown', name: 'unknown');

  @override
  List<Object?> get props => [id];
}
