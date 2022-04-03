import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const MarkerSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Favourite Restaurant"),
    location: Joi.string().required().example("McDonalds"),
    date: Joi.string().required().example("12/12/2021"),
    placemarkid: IdSpec,
  })
  .label("Marker");

export const MarkerSpecPlus = MarkerSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("MarkerPlus");

export const MarkerArraySpec = Joi.array().items(MarkerSpecPlus).label("MarkerArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Dublin"),
    userid: IdSpec,
    markers: MarkerArraySpec,
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");