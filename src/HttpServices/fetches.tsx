import HttpGetCallerWhole, {
  HttpGetCallerFileWhole,
  HttpOTHERcaller,
  HttpOTHERcallerForm,
} from "./apiCallers";

type apiCalls = {
  status: number;
  message: any;
};

type LoginResponse = {
  status: number;
  message: string;
  id: number;
  token: string;
};
type updateRole = {
  userid: string;
  role: string;
};
type createUser = {
  username: string;
  password: string;
  email: string;
};

type Login = {
  email: string;
  password: string;
};
export class userFetches {
  constructor() {}

  uploadFile = async (load: any): Promise<apiCalls> => {
    console.log(`upload`, load);
    const res = await HttpOTHERcallerForm(
      `upload`,
      {
        // "Accept": "application/json",
        // "Content-Type": "multipart/form-data"
        // Authorization: "Bearer token",
      },
      "POST",
      load
    );

    return res;
  };
  downloadFile = async (): Promise<any> => {
    const res = await HttpGetCallerFileWhole("download-template", {
      "Accept": "text/csv",
      // "Content-Type": "application/json",
      // Authorization: "Bearer token",
    });

    return res;
  };
  getAllusers = async (): Promise<apiCalls> => {
    const res = await HttpGetCallerWhole("users", {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer token",
    });

    return res;
  };
  getUser = async (id: string): Promise<apiCalls> => {
    const res = await HttpGetCallerWhole(`user/${id}`, {
      Accept: "application/json",
      "Content-Type": "application/json",
      //   Authorization: "Bearer token",
    });

    return res;
  };
  getUserRole = async (id: string): Promise<apiCalls> => {
    const res = await HttpGetCallerWhole(`role/${id}`, {
      Accept: "application/json",
      "Content-Type": "application/json",
      //   Authorization: "Bearer token",
    });

    return res;
  };
  updateRole = async (load: updateRole): Promise<apiCalls> => {
    console.log(`updateRoleLoad`, load);
    const res = await HttpOTHERcaller(
      `update-role`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer token",
      },
      "PUT",
      load
    );

    return res;
  };
  deleteuser = async (id: string): Promise<apiCalls> => {
    const res = await HttpOTHERcaller(
      `delete/${id}`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer token",
      },
      "DELETE",
      {}
    );

    return res;
  };
  createuser = async (load: createUser): Promise<apiCalls> => {
    console.log(`create user load`, load);
    const res = await HttpOTHERcaller(
      `create`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer token",
      },
      "POST",
      load
    );

    return res;
  };
  Login = async (load: Login): Promise<LoginResponse> => {
    console.log(`login`, load);
    const res = await HttpOTHERcaller(
      `login`,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer token",
      },
      "POST",
      load
    );

    return res;
  };
}
