import { useQuery } from "@tanstack/react-query";
import { TextInput, Select, Label, Button } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const EmRequestAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [availability, setAvailability] = useState("");
  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const listedDate = currentDate;
  const userEmail = user?.email;
  const handleAssetTypeChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setSelectedAssetType(value);
    }
  };
  const handleAvailabilityChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setAvailability(e.target.value);
    }
  };

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["assets", userEmail, search, selectedAssetType, availability],
    queryFn: async () => {
      const queryParams = {};
      if (search.trim() !== "") {
        queryParams.productName = search;
      }
      if (selectedAssetType !== "default") {
        queryParams.productType = selectedAssetType;
      }
      if (availability !== "default") {
        queryParams.availability = availability;
      }
      const response = await axiosSecure.post("find-assets", queryParams);
      return response.data;
    },
    enabled: !!userEmail,
  });

  const handleAddToRequestList = async (e, asset) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const additionalNotes = form.get("additionalNotes");
    const hr = form.get("hr");

    const requestData = {
      user: user?.email,
      assetId: asset._id,
      assetName: asset.productName,
      assetType: asset.productType,
      requestedBy: userEmail,
      additionalNotes: additionalNotes || "",
      hr,
      requestDate: listedDate,
    };

    const response = await axiosSecure.post("assets-request", requestData);
    if (response.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Request successfully added",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById(asset._id).close();
      refetch();
    }
  };
  const { data: requestedAssets = [] } = useQuery({
    queryKey: ["requestedAssets"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `assets-request?email=${userEmail}`
      );
      return response.data;
    },
    enabled: !!userEmail,
  });
  const isAssetRequested = (assetId) =>
    requestedAssets.some((request) => request.assetId === assetId);
  return (
    <>
      <Helmet>
        <title>Request For An Asset</title>
      </Helmet>
      <div className="pb-12  overflow-y-scroll">
        <div className="px-4 py-6 bg-btn shadow-xl">
          <div className="w-11/12 mx-auto">
            <h1 className="text-center text-3xl font-bold text-black py-8">
              Request For An Asset
            </h1>
            <div className="flex items-center bg-nav rounded-xl shadow-md">
              <TextInput
                id="fullName"
                type="text"
                value={search}
                onChange={(e) => {
                  e.preventDefault();
                  setSearch(e.target.value);
                }}
                placeholder="Search Item by Name"
                shadow
                className="focus:ring-0 w-full "
              />
              <button>
                <IoSearch className="w-24 text-2xl text-white rounded" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
              <div className="shadow-md rounded-xl">
                <Select
                  value={availability}
                  onChange={handleAvailabilityChange}
                >
                  <option value="default">Filter Items by Availability </option>
                  <option value="Available">Available</option>
                  <option value="Out-of-stock">Out-of-stock</option>
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
        <div className="bg-white rounded-3xl w-11/12 mx-auto my-8 shadow-xl py-2">
          <div className="flex flex-col overflow-hidden">
            <div className="-m-1.5 overflow-x-auto">
              <div className="px-1.5 pb-1.5  min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full ">
                    <thead className="  text-white">
                      <tr className="bg-nav  rounded-l-3xl ">
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-base font-medium "
                        >
                          Asset Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-base font-medium "
                        >
                          Asset Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-base font-medium "
                        >
                          Availability
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-base font-medium "
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {assets.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center text-sm text-black py-2"
                          >
                            No data found
                          </td>
                        </tr>
                      ) : (
                        assets.map((asset) => {
                          const outStock =
                            asset.availability === "Out of Stock"
                              ? true
                              : false;
                          return (
                            <tr key={asset._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                {asset.productName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                {asset.productType}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                {asset.availability}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <div className="flex justify-center items-center gap-2">
                                  <button
                                    className={`text-white font-bold px-3 py-1 rounded-md ${
                                      outStock || isAssetRequested(asset._id)
                                        ? "bg-gray-200 cursor-not-allowed text-black"
                                        : "bg-nav hover:bg-blue-600"
                                    }`}
                                    disabled={
                                      outStock || isAssetRequested(asset._id)
                                    }
                                    onClick={() =>
                                      !isAssetRequested(asset._id) &&
                                      document
                                        .getElementById(`${asset._id}`)
                                        .showModal()
                                    }
                                  >
                                    {isAssetRequested(asset._id)
                                      ? "Already Requested"
                                      : "Request"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {assets.map((asset) => (
          <dialog id={asset._id} key={asset._id} className="modal">
            <div className="modal-box">
              <form
                onSubmit={(e) => handleAddToRequestList(e, asset)}
                className="flex flex-col gap-4"
              >
                <input type="hidden" value={asset.listedBy} name="hr" />
                <div>
                  <Label htmlFor="additionalNotes" value="Additional Notes" />
                  <TextInput
                    id="additionalNotes"
                    type="text"
                    name="additionalNotes"
                    placeholder="Add additional notes"
                    shadow
                  />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <Button type="submit" className="bg-nav">
                    Request
                  </Button>
                  <button
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => document.getElementById(asset._id).close()}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        ))}
      </div>
    </>
  );
};

export default EmRequestAsset;
