import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableComponent = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");

        const updateUser = { ...item, ...row };
        await editUser(updateUser);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const editUser = async (updateUser) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/usuario/edit/${updateUser.key}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUser),
        }
      );

      if (res.ok) {
        const data = await res.json();
        alert("Usuario actualizado: " + data.message);
      } else {
        const error = await res.json();
        alert("Error al actualizar: " + error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/usuario/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        alert("Usuario Eliminado: " + data.message);

        const newData = data.filter((item) => item.key !== id);
        setData(newData)
      } else {
        const error = await res.json();
        alert("Error al eliminar: " + error.message);

      }
    } catch (error) {}
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      editable: false,
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
      editable: true,
    },
    {
      title: "Correo",
      dataIndex: "correo",
      key: "correo",
      editable: true,
    },
    {
      title: "Nombre completo",
      dataIndex: "nombre_completo",
      key: "nombre_completo",
      editable: false,
    },
    {
      title: "Tipo usuario",
      dataIndex: "tipo_usuario",
      key: "tipo_usuario",
      editable: true,
    },
    {
      title: "Acción",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Guardar
            </Typography.Link>
            <Popconfirm
              title="¿Seguro que quieres cancelar?"
              onConfirm={cancel}
            >
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <EditOutlined />
            </Typography.Link>

            <Popconfirm
              title="¿Seguro que quieres eliminar este usuario?"
              onConfirm={() => deleteUser(record.key)}
            >
              <Typography.Link style={{ marginLeft: 8 }}>
                <DeleteOutlined />
              </Typography.Link>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/usuario/user");
        const data = await res.json();

        // Asignar un key único basado en el id
        const formattedData = data.map((item) => ({
          ...item,
          key: item.id, // Asigna la propiedad key
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    getUsuarios();
  }, []);

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default TableComponent;
