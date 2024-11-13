import { IApiData } from "../Types";

interface ViewClientSensorsProps {
  data: IApiData;
}
const ViewClientSensors = ({ data }: ViewClientSensorsProps) => {
    // console.log(`sensor data`, data);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Client: {data.nameOfClient}
      </h2>
      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Sensor</th>
              <th className="py-2 px-4 text-left">Message</th>

              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.sensors.map(
              ({ sensor, message, status, timestamp }, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-2 px-4">{sensor}</td>
                  <td className="py-2 px-4">{message}</td>

                  <td
                    className={`py-2 px-4 font-semibold ${
                      status === 1 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {status}
                  </td>
                  <td className="py-2 px-4">
                    {timestamp ? new Date(timestamp).toLocaleString() : "-"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewClientSensors;
