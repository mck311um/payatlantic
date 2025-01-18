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
import FormSelect from "../../../components/FormInputs/FormSelect";
import FormTextArea from "../../../components/FormInputs/FormTextArea";
import FormCheckbox from "../../../components/FormInputs/FormCheckbox";
import AdminContext from "../../../context/AdminContext";

const DeductionsPage = () => {
  const title = "Deduction";
  const lowercaseTitle = title.toLowerCase();

  const { user, isLoading } = useAuthContext();

  const [data, setData] = useState<Deduction[]>([]);
  const [filteredData, setFilteredData] = useState<Deduction[]>([]);
  const [itemToDelete, setItemToDelete] = useState<Deduction | null>(null);
  const [itemToEdit, setItemToEdit] = useState<Deduction | null>(null);
  const [loading, setLoading] = useState(false);
  const [manageModalOpen, setManageModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`admin/${lowercaseTitle}s`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      const sortedData = res.data.sort((a: Deduction, b: Deduction) =>
        a.deduction.localeCompare(b.deduction)
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
        el.deduction.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.deduction.localeCompare(b.deduction));
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const renderActions = useCallback(
    (props: Deduction) => (
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

  return (
    <PageLayout>
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{title}s</h1>
        <p className="mt-1 text-lg text-gray-500">
          Define and manage deductions
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
            <ColumnDirective
              field="deduction"
              headerText="Deduction"
              width={200}
            />
            <ColumnDirective
              field="description"
              headerText="Description"
              width={500}
            />
            <ColumnDirective field="unit" headerText="Unit" width={100} />
            <ColumnDirective
              field="isActive"
              headerText="Status"
              width={100}
              template={renderStatus}
            />
            <ColumnDirective
              field=""
              width={100}
              headerText="Actions"
              template={renderActions}
              textAlign={"Right"}
            />
          </ColumnsDirective>
          <Inject services={[Sort]} />
        </GridComponent>
      )}
      {manageModalOpen && (
        <ManageDeductionModal
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

export default DeductionsPage;

export function ManageDeductionModal({
  onClose,
  itemToEdit,
  title,
  lowercaseTitle,
  itemToDelete,
}: ManageItemModalProp) {
  const { user } = useAuthContext();
  const { fetchData: refreshData } = useContext(AdminContext);

  const units = [
    { label: "Days", unit: "days" },
    { label: "Dollars", unit: "dollars" },
    { label: "Percentage", unit: "percentage" },
  ];

  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [item, setItem] = useState<Deduction>(
    itemToEdit ||
      itemToDelete || {
        deduction: "",
        unit: "dollars",
        description: "",
        isActive: true,
      }
  );

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (itemToEdit) {
        await axios.put(
          `admin/${lowercaseTitle}s/${itemToEdit.deductionId}`,
          item,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        toast.success(`${title} updated successfully`);
      } else if (itemToDelete) {
        await axios.delete(
          `admin/${lowercaseTitle}es/${itemToDelete.deductionId}`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
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
    setItem((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = (isEditing: boolean) => {
    let isFormValid = true;

    if (!isEditing) {
      if (item.deduction.trim() === "") {
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
              label="Deduction"
              name="deduction"
              value={item.deduction}
              readOnly={itemToDelete ? true : false}
              type="text"
              isValid={isValid}
              required={true}
            />
            <FormSelect
              value={item.unit}
              data={units}
              handleInputChange={handleInputChange}
              label="Unit"
              labelField="label"
              name="unit"
              placeholder="Unit"
              valueField="unit"
              required={true}
              isValid={false}
            />
            <FormTextArea
              value={item.description}
              handleInputChange={handleInputChange}
              label="Description"
              name="description"
              required={true}
              isValid={false}
              readOnly={false}
              rows={2}
            />
            <FormCheckbox
              checked={item.isActive}
              name="isActive"
              handleInputChange={handleInputChange}
              label="Active"
            />
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
    </dialog>
  );
}
