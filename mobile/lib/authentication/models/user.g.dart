// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) => User(
      userAccount: json['userAccount'] as String,
      name: json['name'] as String,
      userPW: json['userPW'] as String?,
      id: json['id'] as int?,
      level: json['level'] as int?,
      nickName: json['nickName'] as String?,
      email: json['email'] as String?,
      dialingCode: json['dialingCode'] as String?,
      phoneNumber: json['phoneNumber'] as String?,
      birthday: json['birthday'] as String?,
      gender: json['gender'] as int?,
      address1: json['address1'] as String?,
      address2: json['address2'] as String?,
      zipCode: json['zipCode'] as String?,
      lastLoginDate: json['lastLoginDate'] as String?,
    );

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'userAccount': instance.userAccount,
      'name': instance.name,
      'id': instance.id,
      'level': instance.level,
      'userPW': instance.userPW,
      'nickName': instance.nickName,
      'email': instance.email,
      'dialingCode': instance.dialingCode,
      'phoneNumber': instance.phoneNumber,
      'birthday': instance.birthday,
      'gender': instance.gender,
      'address1': instance.address1,
      'address2': instance.address2,
      'zipCode': instance.zipCode,
      'lastLoginDate': instance.lastLoginDate,
    };
