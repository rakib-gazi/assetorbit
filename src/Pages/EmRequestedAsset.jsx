import { useQuery } from "@tanstack/react-query";
import { TextInput, Select, Label, Button, Pagination } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import Swal from "sweetalert2";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useEmployee from "../Hooks/useEmployee";
import { Helmet } from "react-helmet";

const EmRequestedAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [searchByName, setSearchByName] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);
  const [totalPages2, setTotalPages2] = useState(1);

  const userEmail = user?.email;

  const handleAssetTypeChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setSelectedAssetType(value);
    }
  };
  const handleStatusChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setStatus(e.target.value);
    }
  };

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["assets", userEmail, searchByName, selectedAssetType, currentPage2, status],
    queryFn: async () => {
      const queryParams = {
        userEmail,
        page: currentPage2,
        limit: 4,  
      };
  
      if (searchByName.trim() !== "") {
        queryParams.productName = searchByName;
      }
      if (selectedAssetType !== "default") {
        queryParams.productType = selectedAssetType;
      }
      if (status !== "default") {
        queryParams.status = status;
      }
  
      const response = await axiosSecure.post("find-assets-request", queryParams);
      
      setTotalPages2(response.data.totalPages); 
      
      return response.data.data;
    },
    enabled: !!userEmail,
  });
  
  const { data: requestedAssets = [], refetch: refetchRequests } = useQuery({
    queryKey: ["requestedAssets"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `assets-request?email=${userEmail}`
      );
      return response.data;
    },
    enabled: !!userEmail,
  });
  const { data: companyInfo = [] } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: async () => {
      const response = await axiosSecure.get(`users/employee-hr/${userEmail}`);
      return response.data;
    },
    enabled: !!userEmail,
  });
  const handleCancelRequest = async (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undone this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`assets-request-delete/${requestId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Canceled!",
              text: "Asset has been Canceled.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleReturnAsset = async (assetId) => {
    const returnedAssets = {
      returnStatus: "returned",
      returnBy: userEmail,
    };
    const res = await axiosSecure.patch(
      `/return-asset/${assetId}`,
      returnedAssets
    );
    if (res.data.modifiedCount === 1) {
      Swal.fire({
        icon: "success",
        title: "Asset returned successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      refetchRequests();
    }
  };
  const handlePageChange2 = (page) => {
    setCurrentPage2(page);
  };
  const AssetPDF = ({ asset }) => (
    <Document>
      <Page>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          Company Name: Your Company
        </Text>
        <Text>Asset Name: {asset.assetName}</Text>
        <Text>Asset Type: {asset.assetType}</Text>
        <Text>Request Date: {asset.requestDate}</Text>
        <Text>Approval Date: {asset.approvalDate}</Text>
        <Text>Request Status: {asset.status}</Text>
        <Text style={{ marginTop: 30 }}>
          Print Date: {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );

  return (
    <>
      <Helmet>
        <title>My Requested Assets</title>
      </Helmet>
      <div className="pb-12 overflow-y-scroll">
        <div className="px-4 py-6 bg-btn shadow-xl">
          <div className="w-11/12 mx-auto">
            <h1 className="text-center text-xl lg:text-3xl font-bold text-black py-8">
              My Requested Assets
            </h1>
            <div className="flex items-center bg-nav rounded-xl shadow-md">
              <TextInput
                id="fullName"
                type="text"
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
                placeholder="Search Item by Name"
                shadow
                className="focus:ring-0 w-full"
              />
              <button>
                <IoSearch className="w-24 text-2xl text-white rounded" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
              <div className="shadow-md rounded-xl">
                <Select value={status} onChange={handleStatusChange}>
                  <option value="default">
                    Filter Items by Request Status{" "}
                  </option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                </Select>
              </div>
              <div className="shadow-md rounded-xl">
                <Select
                  value={selectedAssetType}
                  onChange={handleAssetTypeChange}
                >
                  <option value="default">Filter By Asset Type</option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-Returnable">Non-Returnable</option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl w-11/12 mx-auto my-8 shadow-xl py-2 overflow-x-auto">
          <table className="min-w-full ">
            <thead className="text-white bg-nav">
              <tr>
                <th className="px-6 py-3 text-start text-xs lg:text-base font-medium">
                  Asset Name
                </th>
                <th className="px-6 py-3 text-start text-xs lg:text-base font-medium">
                  Asset Type
                </th>
                <th className="px-6 py-3 text-start text-xs lg:text-base font-medium">
                  Request Date
                </th>
                <th className="px-6 py-3 text-start text-xs lg:text-base font-medium">
                  Approval Date
                </th>
                <th className="px-6 py-3 text-start text-xs lg:text-base font-medium">
                  Request Status
                </th>
                <th className="px-6 py-3 text-center text-xs lg:text-base font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assets.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-sm text-black py-2"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                assets.map((asset) => (
                  <tr key={asset._id}>
                    <td className="px-6 py-4 text-xs lg:text-base">{asset.assetName}</td>
                    <td className="px-6 py-4 text-xs lg:text-base">{asset.assetType}</td>
                    <td className="px-6 py-4 text-xs lg:text-base">{asset.requestDate}</td>
                    <td className="px-6 py-4 text-xs lg:text-base">
                      {asset.status === "Approved" ? asset.approvalDate : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-xs lg:text-base">
                      {asset?.returnStatus === "returned"
                        ? "Returned"
                        : asset.status}
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center items-center gap-2">
                      {asset.status === "Pending" && (
                        <Button
                          color="failure"
                          onClick={() => handleCancelRequest(asset._id)}
                          className="px-1 lg:px-2 py-0.5 lg:py-1"
                        >
                          Cancel
                        </Button>
                      )}
                      {asset.status === "Approved" &&
                        asset.assetType === "Returnable" && (
                          <Button
                            onClick={() => handleReturnAsset(asset._id)}
                            disabled={asset?.returnStatus === "returned"}
                            className={
                              asset?.returnStatus === "returned"
                                ? "bg-gray-400 cursor-not-allowed"
                                : " bg-blue-600"
                            }
                          >
                            {asset?.returnStatus === "returned"
                              ? "Returned"
                              : " Return"}
                          </Button>
                        )}
                      {asset.status === "Approved" && (
                        <PDFDownloadLink
                          document={<AssetPDF asset={asset} />}
                          fileName={`${asset.assetName}-details.pdf`}
                        >
                          <Button className="bg-nav">Print</Button>
                        </PDFDownloadLink>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {assets.length > 0 && (
            <div className="flex justify-start lg:justify-end items-center px-4 mb-4">
              <Pagination

              currentPage={currentPage2}
              totalPages={totalPages2}
              onPageChange={handlePageChange2}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmRequestedAsset;
