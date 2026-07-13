import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ENTITIES } from "../config/entityConfig";
import { entityActions } from "../app/store";
import Header from "../components/layout/Header";
import DataForm from "../components/common/DataForm";
import DataTable from "../components/common/DataTable";

export default function EntityFormPage() {
  const { entityKey } = useParams();
  const entity = ENTITIES[entityKey];
  const dispatch = useDispatch();
  const records = useSelector((state) => state[entityKey]?.records ?? []);
  const [editingRecord, setEditingRecord] = useState(null);

  if (!entity) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Unknown entity: <span className="font-medium text-gray-700">{entityKey}</span>
      </div>
    );
  }

  const actions = entityActions[entityKey];

  const handleSubmit = (fields) => {
    if (editingRecord) {
      dispatch(actions.updateRecord({ id: editingRecord.id, fields }));
      setEditingRecord(null);
    } else {
      dispatch(actions.addRecord(fields));
    }
  };

  return (
    <>
      <Header title={entity.label} />
      <div className="p-6 max-w-5xl">
        <DataForm
          entity={entity}
          editingRecord={editingRecord}
          onSubmit={handleSubmit}
          onCancelEdit={() => setEditingRecord(null)}
        />
        <DataTable
          entity={entity}
          records={records}
          onEdit={setEditingRecord}
          onSoftDelete={(id) => dispatch(actions.softDeleteRecord(id))}
          onRestore={(id) => dispatch(actions.restoreRecord(id))}
        />
      </div>
    </>
  );
}