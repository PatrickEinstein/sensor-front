const uri = "http://localhost:4500/api";

export const HttpGetCallerWhole = async (endpoint: string, headers: any) => {
    try {
      const savedUserResponse = await fetch(`${uri}/${endpoint}`, {
        method: "GET",
        headers: headers,
      });
  
      const responseData = await savedUserResponse.json();
  
      return responseData;
    } catch (err) {
      return err;
    }
  };

  export const HttpGetCallerFileWhole = async (endpoint: string, headers: any) => {
    try {
      const savedUserResponse = await fetch(`${uri}/${endpoint}`, {
        method: "GET",
        headers: headers,
      });
  
      const responseData = await savedUserResponse;
  
      return responseData;
    } catch (err) {
      return err;
    }
  };
  
  export const HttpOTHERcaller = async (
    endpoint: string,
    headers: any,
    method: string,
    body: any
  ) => {
    try {
      const savedUserResponse = await fetch(`${uri}/${endpoint}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
  
      const responseData = await savedUserResponse.json();
  
      return responseData;
    } catch (err) {
      return err;
    }
  };
  
  export const HttpOTHERcallerForm = async (
    endpoint: any,
    headers: any,
    method: string,
    body: any
  ) => {
    try {
      const savedUserResponse = await fetch(`${uri}/${endpoint}`, {
        method: method,
        headers: headers,
        body: body,
      });
  
      const responseData = await savedUserResponse.json();
  
      return responseData;
    } catch (err) {
      return err;
    }
  };
  
  export default HttpGetCallerWhole;
  