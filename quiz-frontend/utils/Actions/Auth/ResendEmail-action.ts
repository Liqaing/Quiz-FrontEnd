"use server";
export const reSendOtp = async ({email} : { email : string}) => {
  let data;
  try {
    const url = process.env.BASE_API_URL + "resendOTP";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        otp: "",
        email: email
      }),
    })
    if(res.ok) {
      data = await res.text();
      return data;
    } else {
      console.log(res);
      throw new Error(await res.text())
    }
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong")
  }
}