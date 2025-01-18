import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Settings, Trash2 } from "lucide-react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Sort,
} from "@syncfusion/ej2-react-grids";
import ButtonRow from "../../../components/ButtonRow";
import Loading from "../../../components/Loading";
import PageLayout from "../../../components/PageLayout";
import SearchBar from "../../../components/SearchBar";
import FormInput from "../../../components/FormInputs/FormInput";
import FormCheckbox from "../../../components/FormInputs/FormCheckbox";
import AdminContext from "../../../context/AdminContext";
import { ManageDepartmentsModal } from "./DepartmentsPage";
import FormAutoComplete from "../../../components/FormInputs/FormAutoComplete";

const BranchPage = () => {
  const title = "Branch";
  const lowercaseTitle = title.toLowerCase();

  const { user, isLoading } = useAuthContext();

  const [data, setData] = useState<Branch[]>([]);
  const [filteredData, setFilteredData] = useState<Branch[]>([]);
  const [itemToDelete, setItemToDelete] = useState<Branch | null>(null);
  const [itemToEdit, setItemToEdit] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(false);
  const [manageModalOpen, setManageModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`admin/${lowercaseTitle}es`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      const sortedData = res.data.sort((a: Branch, b: Branch) =>
        a.branch.localeCompare(b.branch)
      );
      setData(sortedData);
      setFilteredData(sortedData);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (isLoading) return;

      setLoading(true);
      try {
        await fetchData();
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isLoading]);

  useEffect(() => {
    const filtered = data
      .filter((el) =>
        el.branch.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.branch.localeCompare(b.branch));
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const renderActions = useCallback(
    (props: Branch) => (
      <div className="">
        <div className="tooltip tooltip-left" data-tip="Manage">
          <button
            className="grid-edit-button"
            onClick={() => {
              setItemToEdit(props);
              setManageModalOpen(true);
            }}
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <div className="tooltip tooltip-left" data-tip="Delete">
          <button
            className="grid-delete-button"
            onClick={() => {
              setItemToDelete(props);
              setManageModalOpen(true);
            }}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    ),
    []
  );

  const renderStatus = useCallback(
    (props: Branch) => (
      <span
        className={`inline-flex items-center px-2 py-1.5 rounded-full text-xs font-medium ${
          props.isActive === true
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-gray-800"
        }`}
      >
        {props.isActive ? "Active" : "Inactive"}
      </span>
    ),
    []
  );

  const renderAddress = useCallback(
    (props: Branch) => (
      <span>
        {props.address.street}, {props.address.city}, {props.address.country}
      </span>
    ),
    []
  );

  return (
    <PageLayout>
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{title}es</h1>
        <p className="mt-1 text-lg text-gray-500">
          Manage office locations and facilities
        </p>
      </div>
      <div className="flex gap-3 justify-between">
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <ButtonRow
          title={title}
          setModalOpen={setManageModalOpen}
          setLoading={setLoading}
          fetchData={fetchData}
        />
      </div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <GridComponent
          dataSource={filteredData}
          allowSorting={true}
          height={600}
          loadingIndicator={{ indicatorType: "Shimmer" }}
        >
          <ColumnsDirective>
            <ColumnDirective field="branch" headerText="Branch" width={300} />
            <ColumnDirective
              field="address"
              headerText="Address"
              isPrimaryKey={true}
              template={renderAddress}
              width={500}
            />
            <ColumnDirective
              field="headCount"
              headerText="Head Count"
              width={200}
              textAlign="Center"
            />

            <ColumnDirective
              field="isActive"
              headerText="Status"
              width={100}
              template={renderStatus}
            />
            <ColumnDirective
              field=""
              width={120}
              headerText="Actions"
              template={renderActions}
              textAlign="Right"
            />
          </ColumnsDirective>
          <Inject services={[Sort]} />
        </GridComponent>
      )}
      {manageModalOpen && (
        <ManageLocationModal
          onClose={() => {
            setManageModalOpen(false);
            setLoading(true);
            fetchData();
            setItemToEdit(null);
            setItemToDelete(null);
            setLoading(false);
          }}
          itemToEdit={itemToEdit}
          itemToDelete={itemToDelete}
          title={title}
          lowercaseTitle={lowercaseTitle}
        />
      )}
    </PageLayout>
  );
};

export default BranchPage;

export function ManageLocationModal({
  onClose,
  itemToEdit,
  title,
  lowercaseTitle,
  itemToDelete,
}: ManageItemModalProp) {
  const { user } = useAuthContext();
  const { data, fetchData: refreshData } = useContext(AdminContext);

  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addDepartmentOpen, setAddDepartmentOpen] = useState(false);

  const [item, setItem] = useState<Branch>(
    itemToEdit ||
      itemToDelete || {
        branch: "",
        isActive: true,
        isMain: true,
        address: {
          street: "",
          city: "",
          country: "",
        },
      }
  );

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (itemToEdit) {
        await axios.put(
          `admin/${lowercaseTitle}es/${itemToEdit.positionId}`,
          item,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        toast.success(`${title} updated successfully`);
      } else if (itemToDelete) {
        await axios.delete(
          `admin/${lowercaseTitle}es/${itemToDelete.positionId}`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        toast.success(`${title} deleted successfully`);
      } else {
        await axios.post(`admin/${lowercaseTitle}es`, item, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        toast.success(`${title} added successfully`);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      refreshData();
      setIsSubmitting(false);
      onClose();
    }
  };

  const handleInputChange = (name: string) => (e: any) => {
    const { type, checked, value } = e.target;
    const keys = name.split(".");
    setItem((prevData) => {
      const updatedItem = { ...prevData };
      let nested = updatedItem;
      for (let i = 0; i < keys.length - 1; i++) {
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = type === "checkbox" ? checked : value;
      return updatedItem;
    });
  };

  const validateForm = (isEditing: boolean) => {
    let isFormValid = true;

    if (!isEditing) {
      if (item.branch.trim() === "") {
        isFormValid = false;
      }
    }

    return isFormValid;
  };

  useEffect(() => {
    setIsValid(validateForm(!!itemToEdit || !!itemToDelete));
  }, [item, itemToEdit]);

  return (
    <dialog
      open
      className="modal fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex flex-col gap-2">
          <h1 id="modal-title" className="modal-title">
            {itemToEdit
              ? `Edit ${title}`
              : itemToDelete
              ? `Delete ${title}`
              : `Add ${title}`}
          </h1>

          <div className="flex flex-col gap-3">
            <FormInput
              handleInputChange={handleInputChange}
              label="Branch"
              name="branch"
              value={item.branch}
              readOnly={itemToDelete ? true : false}
              type="text"
              isValid={isValid}
              required={true}
            />
            <FormInput
              handleInputChange={handleInputChange}
              label="Street"
              name="address.street"
              value={item.address.street}
              readOnly={itemToDelete ? true : false}
              type="text"
              isValid={isValid}
              required={false}
            />
            <div className="flex gap-3">
              <FormAutoComplete
                value={item.address.country}
                handleInputChange={handleInputChange}
                data={
                  data?.countries.sort((a, b) =>
                    a.country.localeCompare(b.country)
                  ) ?? []
                }
                valueField="countryCode"
                placeholder="Country"
                name={"address.country"}
                labelFields={["country"]}
                label={"Country"}
              />
              <FormAutoComplete
                value={item.address.city}
                handleInputChange={handleInputChange}
                data={
                  data?.villages.sort((a, b) =>
                    a.village.localeCompare(b.village)
                  ) ?? []
                }
                valueField="village"
                placeholder="Village"
                name={"address.city"}
                labelFields={["village"]}
                label={"Village"}
              />
            </div>
            <div className="flex gap-3">
              <FormCheckbox
                checked={item.isMain}
                name="isMain"
                handleInputChange={handleInputChange}
                label="Main Branch"
              />
              <FormCheckbox
                checked={item.isActive}
                name="isActive"
                handleInputChange={handleInputChange}
                label="Active"
              />
            </div>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost text-base" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-success text-white disabled:text-white font-bold text-base"
            onClick={handleSubmit}
            disabled={isSubmitting || !isValid || itemToDelete}
          >
            {isSubmitting
              ? "Submitting"
              : itemToEdit
              ? "Update"
              : itemToDelete
              ? "Delete"
              : "Submit"}
          </button>
        </div>
      </div>
      {addDepartmentOpen && (
        <ManageDepartmentsModal
          onClose={() => {
            setAddDepartmentOpen(false);
          }}
          lowercaseTitle={"department"}
          title={"department"}
        />
      )}
    </dialog>
  );
}
