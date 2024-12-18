// src/components/PuertosForm.tsx

import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Checkbox, InputNumber } from 'antd';
import {Puerto} from "../../store/slices/puertosSlice.tsx";

interface PuertosFormProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    initialValues?: Puerto;
    // paisOptions: Pais[];
    sectorOptions?: any[]; // Define una interfaz adecuada si tienes datos de sectores
}

export const PuertosForm: React.FC<PuertosFormProps> = ({
                                                            visible,
                                                            onCancel,
                                                            onSubmit,
                                                            initialValues,
                                                            paisOptions,
                                                            sectorOptions = [],
                                                        }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                // pais: initialValues.pais,
                // sector: initialValues.sector,
            });
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                onSubmit(values);
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            visible={visible}
            title={initialValues ? 'Editar Puerto' : 'Agregar Nuevo Puerto'}
            onCancel={onCancel}
            onOk={handleOk}
            okText={initialValues ? 'Actualizar' : 'Agregar'}
            cancelText="Cancelar"
            className="ant-modal-body"
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                className="space-y-4"
            >
                <Form.Item
                    name="nombre"
                    label="Nombre"
                    rules={[{ required: true, message: 'Por favor, ingresa el nombre del puerto' }]}
                >
                    <Input placeholder="Nombre del Puerto" />
                </Form.Item>

                <Form.Item
                    name="tipo"
                    label="Tipo de Carga"
                    rules={[{ required: true, message: 'Por favor, selecciona el tipo de carga' }]}
                >
                    <Select placeholder="Selecciona el tipo de carga">
                        {tipoCargaOptions.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="pais"
                    label="País"
                    rules={[{ required: true, message: 'Por favor, selecciona un país' }]}
                >
                    <Select placeholder="Selecciona un país">
                        {paisOptions.map((pais) => (
                            <Select.Option key={pais.codigo} value={pais.codigo}>
                                {pais.nombre}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="latitud"
                    label="Latitud"
                    rules={[
                        {
                            type: 'number',
                            min: -90,
                            max: 90,
                            message: 'Por favor, ingresa una latitud válida',
                        },
                    ]}
                >
                    <InputNumber
                        placeholder="Latitud"
                        style={{ width: '100%' }}
                        min={-90}
                        max={90}
                        step={0.0001}
                    />
                </Form.Item>

                <Form.Item
                    name="longitud"
                    label="Longitud"
                    rules={[
                        {
                            type: 'number',
                            min: -180,
                            max: 180,
                            message: 'Por favor, ingresa una longitud válida',
                        },
                    ]}
                >
                    <InputNumber
                        placeholder="Longitud"
                        style={{ width: '100%' }}
                        min={-180}
                        max={180}
                        step={0.0001}
                    />
                </Form.Item>

                <Form.Item
                    name="zona_geografica"
                    label="Zona Geográfica"
                >
                    <Input placeholder="Zona Geográfica" />
                </Form.Item>

                <Form.Item
                    name="sector"
                    label="Sector"
                >
                    <Select placeholder="Selecciona un sector" allowClear>
                        {sectorOptions.map((sector) => (
                            <Select.Option key={sector.id} value={sector.id}>
                                {sector.nombre}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="important" valuePropName="checked">
                    <Checkbox>Importante</Checkbox>
                </Form.Item>

                <Form.Item
                    name="eslora_max"
                    label="Eslora Máxima (m)"
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            message: 'Por favor, ingresa una eslora válida',
                        },
                    ]}
                >
                    <InputNumber
                        placeholder="Eslora Máxima"
                        style={{ width: '100%' }}
                        min={0}
                        step={0.1}
                    />
                </Form.Item>

                <Form.Item
                    name="tipos_cargas"
                    label="Tipos de Cargas"
                >
                    <Select
                        mode="multiple"
                        placeholder="Selecciona los tipos de cargas"
                        allowClear
                    >
                        {tipoCargaOptions.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
