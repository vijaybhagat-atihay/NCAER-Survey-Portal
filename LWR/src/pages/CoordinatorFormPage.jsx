import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coordinatorActions } from "../app/store";
import Header from "../components/layout/Header";
import CoordinatorForm from "../components/coordinator/CoordinatorForm";
import CoordinatorTable from "../components/coordinator/CoordinatorTable";

export default function CoordinatorFormPage() {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.coordinators?.records ?? []);
  const [editingRecord, setEditingRecord] = useState(null);

  const handleSubmit = (fields) => {
    if (editingRecord) {
      dispatch(coordinatorActions.updateRecord({ id: editingRecord.id, fields }));
      setEditingRecord(null);
    } else {
      dispatch(coordinatorActions.addRecord(fields));
    }
  };

  return (
    <>
      <Header title="District Coordinator Registration" />
      <div className="p-6 max-w-5xl">
        <CoordinatorForm
          editingRecord={editingRecord}
          onSubmit={handleSubmit}
          onCancelEdit={() => setEditingRecord(null)}
        />
        <CoordinatorTable
          records={records}
          onEdit={setEditingRecord}
          onSoftDelete={(id) => dispatch(coordinatorActions.softDeleteRecord(id))}
          onRestore={(id) => dispatch(coordinatorActions.restoreRecord(id))}
        />
      </div>
    </>
  );
}