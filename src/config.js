import { CognitoUserPool } from "amazon-cognito-identity-js";

const POOL_DATA = {
  UserPoolId: "us-east-1_maXZKYeII",
  ClientId: "5srhr8rn2qull1oijqtv9tfu8r"
};

export const userPool = new CognitoUserPool(POOL_DATA);
