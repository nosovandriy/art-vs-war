export interface AccountFormData {
  firstName: string,
  lastName: string,
  phone: string,
}

export interface AccountData extends AccountFormData {
  email: string,
}

export interface CreatedAccountResponse extends AccountData {
  cognitoSubject: string,
  cognitoUsername: string,
}
