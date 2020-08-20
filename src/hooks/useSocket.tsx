import useState from "react";

export const useSocket = (apiUrl: string, uniqueIdentifier: string) => {
    const [data, setData] = useState([]);
    let socketInstance = SocketService.createConnection(apiUrl, uniqueIdentifier);
    useEffect(() => {
        effect
        return () => {
            if (socketInstance && socketInstance.disconnect) {
                socketInstance.disconnect();
            }
        }
    }, [uniqueIdentifier]);

    return {

    };
};
