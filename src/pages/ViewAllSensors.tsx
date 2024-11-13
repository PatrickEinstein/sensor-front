import { MessageData } from "../Types";

interface ViewAllSensorsProps {
  data: MessageData[];
}
const ViewAllSensors = ({ data }: ViewAllSensorsProps) => {
  // console.log(`ViewAllSensors`, data);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Sensors Data</h2>
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
            {data.map((sensorData, index:number) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4">{sensorData.sensor}</td>
                <td className="py-2 px-4">{sensorData.message}</td>
  
                <td
                  className={`py-2 px-4 font-semibold ${
                    sensorData.status === 1 ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {sensorData.status === 1 ? "ON": "OFF"}
                </td>
                <td className="py-2 px-4">
                  {sensorData.timestamp
                    ? new Date(sensorData.timestamp).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllSensors;
