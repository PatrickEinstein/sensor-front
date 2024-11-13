import { useEffect, useState } from "react";
import io from "socket.io-client";
import { IApiData, MessageData } from "../Types";
import { sections } from "../constants";
import ViewAllSensors from "./ViewAllSensors";
import ViewClientSensors from "./ViewClientSensors";
const socket = io("http://localhost:4500");

interface IModeAndData {
  isActive: boolean;
  mode: string;
}

function DashBoard() {
  const [dataAndMode, setDataAandMode] = useState<IModeAndData>({
    isActive: false,
    mode: "",
  });

  const [allDataToView, setAllDataToView] = useState<MessageData[]>([
    {
      message: 0,
      room: 0,
      status: 0,
      sensor: "S0",
      timestamp: new Date(),
    },
  ]);

  const [clientDataToView, setClientDataToView] = useState<IApiData[]>([
    {
      nameOfClient: "Sample",
      sensors: [
        {
          message: 0,
          room: "",
          status: 0,
          sensor: "",
          timestamp: new Date(),
        },
      ],
    },
  ]);
  const [messageList, setMessageList] = useState<MessageData[]>([
    {
      message: 0,
      room: 0,
      status: 0,
      sensor: "S0",
      timestamp: new Date(),
    },
  ]);

  const [apiData, setApiData] = useState<IApiData[]>([
    {
      nameOfClient: "",
      sensors: [
        {
          message: 0,
          room: "",
          status: 0,
          sensor: "",
          timestamp: new Date(),
        },
      ],
    },
  ]);

  useEffect(() => {
    const joinRoom = () => {
      socket.emit("join_room", "0");
    };

    joinRoom();

    const handleApiData = (data: IApiData[]) => {
      setApiData(data);
    };
    const handleNewUploadedData = (newUploads: IApiData[]) => {
      setApiData((prevApiData) => {
        // Step 1: Update existing entries and merge sensors arrays, ensuring uniqueness
        const updatedApiData = prevApiData.map((apidataObject) => {
          const matchedNewUpload = newUploads.find(
            (elementsInNewUploads) =>
              elementsInNewUploads.nameOfClient === apidataObject.nameOfClient
          );

          if (matchedNewUpload) {
            // Merge and remove duplicates from the sensors array
            const uniqueSensors = [
              ...apidataObject.sensors,
              ...matchedNewUpload.sensors,
            ].filter(
              (sensor, index, self) =>
                self.findIndex((s) => s.sensor === sensor.sensor) === index // Ensure unique sensors by 'id'
            );

            return {
              ...apidataObject,
              sensors: uniqueSensors,
            };
          } else {
            return apidataObject;
          }
        });

        // Step 2: Add new entries that don’t exist in prevApiData
        const newEntries = newUploads.filter(
          (elementsInNewUploads) =>
            !prevApiData.some(
              (apidataObject) =>
                apidataObject.nameOfClient === elementsInNewUploads.nameOfClient
            )
        );

        // Step 3: Combine updated data (existing + modified) and new entries (added)
        const finalData = [...updatedApiData, ...newEntries];

        // Step 4: Remove duplicates by 'nameOfClient' across the whole array
        const uniqueFinalData = finalData.filter(
          (item, index, self) =>
            self.findIndex((obj) => obj.nameOfClient === item.nameOfClient) ===
            index
        );

        // Update the state with unique final data
        return uniqueFinalData;
      });
    };

  

    const handleEachSensor = (data: MessageData) => {
      setMessageList((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.sensor === data.sensor
        );
        if (existingIndex !== -1) {
          const updatedList = [...prev];
          updatedList[existingIndex] = data;
          return updatedList;
        } else {
          return [...prev, data];
        }
      });
    };

    const handleEachSensorForNewUploads = (data: MessageData) => {
      setMessageList((prev) => {
        // Check if an item with the same `sensor` and `message` already exists
        const existingIndex = prev.findIndex(
          (item) => item.sensor === data.sensor && item.message === data.message
        );
    
        if (existingIndex !== -1) {
          // If it exists, replace the existing item with the new data
          const updatedList = [...prev];
          updatedList[existingIndex] = data;
          return updatedList;
        } else {
          // If it doesn’t exist, add the new data
          return [...prev, data];
        }
      });
    };
    

    socket.on("connect", joinRoom);

    socket.on("api_data", handleNewUploadedData);
    // socket.on("api_data", handleApiData);
    socket.on("each_sensor", handleEachSensor);
    socket.on("new_feeds_available", handleNewUploadedData);
    socket.on("new_feeds_available_each_sensor", handleEachSensorForNewUploads);

    return () => {
      socket.off("connect", joinRoom);
      socket.off("api_data");
      socket.off("each_sensor");
      socket.off("new_feeds_available");
      socket.off("new_feeds_available_each_sensor");
    };
  }, []);

  // useEffect(() => {
  //   console.log(`api_data`, apiData);
  //   console.log(`message_list`, messageList);
  // });

  return (
    <div className="px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-blue-100">
        {sections.map(({ title, marker }) => (
          <div
            key={title}
            className="bg-white p-6 h-[300px] rounded-lg shadow-lg flex flex-col items-center justify-center text-center"
            onClick={() => {
              const newData =
                title !== "Total"
                  ? messageList.filter(
                      (messageListItem) => messageListItem.message === marker
                    )
                  : messageList.filter(
                      (messageListItem) => messageListItem.message !== marker
                    );
              setDataAandMode({
                isActive: true,
                mode: "All",
              });
              setAllDataToView(newData);
            }}
          >
            <div>
              <p className="text-4xl mb-4 text-blue-500">{title}</p>
              <p className="text-4xl mb-4 text-blue-500">
                {title !== "Total"
                  ? messageList.filter(({ message }) => message == marker)
                      .length
                  : messageList.filter(({ message }) => message !== marker)
                      .length}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 ">
        {apiData.map(({ nameOfClient, sensors }) => (
          <div
            key={nameOfClient}
            className="bg-white p-3  rounded-lg shadow-lg flex flex-col items-center justify-center text-center"
            onClick={() => {
              const newData = apiData.filter(
                (apiDataItem) => apiDataItem.nameOfClient === nameOfClient
              );
              setDataAandMode({
                isActive: true,
                mode: "Client",
              });
              setClientDataToView(newData);
            }}
          >
            <div>
              <p className="text-1xl mb-2 text-blue-500">{nameOfClient}</p>
              <p className="text-1xl mb-2 text-blue-500">
                Total: {sensors.length}
              </p>
              <p className="text-1xl mb-2 text-blue-500">
                Online: {sensors.filter(({ message }) => message == 1).length}
              </p>
              <p className="text-1xl mb-2 text-blue-500">
                Offline: {sensors.filter(({ message }) => message == 0).length}
              </p>
            </div>
          </div>
        ))}
      </div>

      {dataAndMode.mode == "All" && dataAndMode.isActive ? (
        <ViewAllSensors data={allDataToView} />
      ) : (
        <ViewClientSensors data={clientDataToView[0]} />
      )}
    </div>
  );
}

export default DashBoard;
