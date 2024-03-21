const renderDaysToWorkEditor = (props) => {
    return (
      <div>
        <Calendar type="date" showIcon value={editingRow ? editingRow['date'] : ''} onChange={(e) => {
          const newValue = e.target.value;
          setEditingRow((prevState) => ({
            ...prevState,
            'date': newValue
          }));
        }} />
        <InputText type="text" value={editingRow ? editingRow['fromhour'] : ''} onChange={(e) => {
          const newValue = e.target.value;
          setEditingRow((prevState) => ({
            ...prevState,
            'fromhour': newValue
          }));
        }} placeholder="From Hour (HH:mm)" />
        <InputText type="text" value={editingRow ? editingRow['tohour'] : ''} onChange={(e) => {
          const newValue = e.target.value;
          setEditingRow((prevState) => ({
            ...prevState,
            'tohour': newValue
          }));
        }} placeholder="To Hour (HH:mm)" />
      </div>
    );
  }