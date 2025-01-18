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
import FormAutoComplete from "../../../components/FormInputs/FormAutoComplete";
import FormCheckbox from "../../../components/FormInputs/FormCheckbox";
import AdminContext from "../../../context/AdminContext";
import { ManageDepartmentsModal } from "./DepartmentsPage";
import { getCountryByCountryCode } from "../../../constants/utils";

const BanksPage = () => {
  const title = "Bank";
  const lowercaseTitle = title.toLowerCase();

  const { user, isLoading } = useAuthContext();

  const [data, setData] = useState<Bank[]>([]);
  const [filteredData, setFilteredData] = useState<Bank[]>([]);
  const [itemToDelete, setItemToDelete] = useState<Bank | null>(null);
  const [itemToEdit, setItemToEdit] = useState<Bank | null>(null);
  const [loading, setLoading] = useState(false);
  const [manageModalOpen, setManageModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`admin/${lowercaseTitle}s`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      const sortedData = res.data.sort((a: Bank, b: Bank) =>
        a.bank.localeCompare(b.bank)
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
      .filter((el) => el.bank.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => a.bank.localeCompare(b.bank));
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const renderActions = useCallback(
    (props: Bank) => (
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
    (props: Bank) => (
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
    (props: Bank) => (
      <span>
        {props.address.street}, {props.address.city},{" "}
        {getCountryByCountryCode(props.address.country)}
      </span>
    ),
    []
  );

  const renderType = useCallback(
    (props: Bank) => (
      <span>{props.isCreditor ? "Creditor" : "Bank/Creditor"}</span>
    ),
    []
  );
  return (
    <PageLayout>
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{title}s</h1>
        <p className="mt-1 text-lg text-gray-500">
          Manage banks for employee payments
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
            <ColumnDirective field="bankCode" headerText="Code" width={100} />
            <ColumnDirective field="bank" headerText="Bank" width={400} />
            <ColumnDirective
              field="address"
              headerText="Address"
              isPrimaryKey={true}
              template={renderAddress}
              width={400}
            />
            <ColumnDirective
              field="isCreditor"
              headerText="Bank Type"
              width={200}
              template={renderType}
            />

            <ColumnDirective
              field="isActive"
              headerText="Status"
              width={100}
              template={renderStatus}
            />
            <ColumnDirective
              field=""
              width={130}
              headerText="Actions"
              template={renderActions}
              textAlign={"Right"}
            />
          </ColumnsDirective>
          <Inject services={[Sort]} />
        </GridComponent>
      )}
      {manageModalOpen && (
        <ManageBankModal
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

export default BanksPage;

export function ManageBankModal({
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

  const [item, setItem] = useState<Bank>(
    itemToEdit ||
      itemToDelete || {
        bank: "",
        bankCode: "",
        isActive: true,
        isCreditor: false,
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
        await axios.put(`admin/${lowercaseTitle}s/${itemToEdit.bankId}`, item, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        toast.success(`${title} updated successfully`);
      } else if (itemToDelete) {
        await axios.delete(`admin/${lowercaseTitle}s/${itemToDelete.bankId}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        toast.success(`${title} deleted successfully`);
      } else {
        await axios.post(`admin/${lowercaseTitle}s`, item, {
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
      if (item.bank.trim() === "") {
        isFormValid = false;
      }

      if (item.bankCode.trim() === "") {
        isFormValid = false;
      }

      if (item.address.street.trim() === "") {
        isFormValid = false;
      }

      if (item.address.city.trim() === "") {
        isFormValid = false;
      }

      if (item.address.country.trim() === "") {
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
            <div className="flex gap-3">
              <div className="w-4/5">
                <FormInput
                  handleInputChange={handleInputChange}
                  label="Bank"
                  name="bank"
                  value={item.bank}
                  readOnly={itemToDelete ? true : false}
                  type="text"
                  isValid={isValid}
                  required={true}
                />
              </div>
              <div className="w-1/5">
                <FormInput
                  handleInputChange={handleInputChange}
                  label="Code"
                  name="bankCode"
                  value={item.bankCode}
                  readOnly={itemToDelete ? true : false}
                  type="text"
                  isValid={isValid}
                  required={true}
                />
              </div>
            </div>

            <FormInput
              handleInputChange={handleInputChange}
              label="Street"
              name="address.street"
              value={item.address.street}
              readOnly={itemToDelete ? true : false}
              type="text"
              isValid={isValid}
              required={true}
            />
            <div className="flex gap-3">
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
                required={true}
              />
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
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <FormCheckbox
                checked={item.isActive}
                name="isActive"
                handleInputChange={handleInputChange}
                label="Active"
              />
              <FormCheckbox
                checked={item.isCreditor}
                name="isCreditor"
                handleInputChange={handleInputChange}
                label="Bank is a Creditor Only"
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
            disabled={isSubmitting || !isValid || !itemToDelete}
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
