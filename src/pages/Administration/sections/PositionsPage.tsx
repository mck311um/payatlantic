import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";
import PageLayout from "../../../components/PageLayout";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Sort,
} from "@syncfusion/ej2-react-grids";
import ButtonRow from "../../../components/ButtonRow";
import Loading from "../../../components/Loading";
import SearchBar from "../../../components/SearchBar";
import AdminContext from "../../../context/AdminContext";
import FormInput from "../../../components/FormInputs/FormInput";
import FormCheckbox from "../../../components/FormInputs/FormCheckbox";
import FormAutoComplete from "../../../components/FormInputs/FormAutoComplete";
import { ManageDepartmentsModal } from "./DepartmentsPage";
import FormTextArea from "../../../components/FormInputs/FormTextArea";

const PositionsPage = () => {
  const title = "Position";
  const lowercaseTitle = title.toLowerCase();

  const { user, isLoading } = useAuthContext();

  const [data, setData] = useState<Position[]>([]);
  const [filteredData, setFilteredData] = useState<Position[]>([]);
  const [itemToDelete, setItemToDelete] = useState<Position | null>(null);
  const [itemToEdit, setItemToEdit] = useState<Position | null>(null);
  const [loading, setLoading] = useState(false);
  const [manageModalOpen, setManageModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`admin/${lowercaseTitle}s`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      const sortedData = res.data.sort((a: Position, b: Position) =>
        a.position.localeCompare(b.position)
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
        el.position.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.department.localeCompare(b.department));
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const renderActions = useCallback(
    (props: Position) => (
      <div className="">
        <button
          className="text-blue-600 hover:text-blue-900 mr-3"
          onClick={() => {
            setItemToEdit(props);
            setManageModalOpen(true);
          }}
        >
          <Pencil className="h-5 w-5" />
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => {
            setItemToDelete(props);
            setManageModalOpen(true);
          }}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    ),
    []
  );

  const renderStatus = useCallback(
    (props: Department) => (
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
          Define and manage job positions
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
            <ColumnDirective field="position" headerText="Positions" />
            <ColumnDirective
              field="department"
              headerText="Department"
              isPrimaryKey={true}
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
              width={150}
              template={renderStatus}
            />
            <ColumnDirective
              field=""
              width={150}
              headerText="Actions"
              template={renderActions}
            />
          </ColumnsDirective>
          <Inject services={[Sort]} />
        </GridComponent>
      )}
      {manageModalOpen && (
        <ManagePositionModal
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

export default PositionsPage;

export function ManagePositionModal({
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

  const [item, setItem] = useState<Position>(
    itemToEdit ||
      itemToDelete || {
        position: "",
        departmentId: "",
        department: "",
        isActive: true,
        description: "",
      }
  );

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (itemToEdit) {
        await axios.put(
          `admin/${lowercaseTitle}s/${itemToEdit.positionId}`,
          item,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        toast.success(`${title} updated successfully`);
      } else if (itemToDelete) {
        await axios.delete(
          `admin/${lowercaseTitle}s/${itemToDelete.positionId}`,
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
      setItem({
        position: "",
        departmentId: "",
        department: "",
        isActive: true,
        positionId: "",
        headCount: 0,
        modifiedBy: "",
        description: "",
      });
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
      if (item.position.trim() === "") {
        isFormValid = false;
      }

      if (item.departmentId.trim() === "") {
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
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
              label="Title"
              name="position"
              value={item.position}
              readOnly={itemToDelete ? true : false}
              type="text"
              isValid={isValid}
              required={true}
            />
            <div className="flex gap-2 justify-end items-end">
              <FormAutoComplete
                value={item.departmentId}
                handleInputChange={handleInputChange}
                data={
                  data?.departments.sort((a, b) =>
                    a.department.localeCompare(b.department)
                  ) ?? []
                }
                valueField="departmentId"
                placeholder="Select Department"
                name="departmentId"
                labelFields={["department"]}
                label="Department"
                required={true}
              />
              <div
                className="tooltip tooltip-bottom tooltip-info"
                data-tip="New"
              >
                <button
                  className="btn btn-success text-white btn-outline btn-square"
                  onClick={() => {
                    setAddDepartmentOpen(true);
                  }}
                >
                  <Plus />
                </button>
              </div>
            </div>
            <FormTextArea
              value={item.description}
              handleInputChange={handleInputChange}
              label="Description"
              name="description"
              required={false}
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
            {item.headCount > 0 && itemToDelete && (
              <div role="alert" className="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  className="h-6 w-6 shrink-0 text-error stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>

                <span className="select-none font-semibold">
                  There are {item.headCount} assigned employees to this
                  department. Unassign or terminate to delete department
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost text-base" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-success text-white disabled:text-white font-bold text-base"
            onClick={handleSubmit}
            disabled={
              isSubmitting || !isValid || (itemToDelete && item.headCount > 0)
            }
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
