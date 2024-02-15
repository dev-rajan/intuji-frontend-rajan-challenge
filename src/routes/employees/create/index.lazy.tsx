import { RightOutlined, UploadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFirebase } from "@src/context/Firebase";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  CheckboxProps,
  Col,
  DatePicker,
  Divider,
  Form,
  GetProp,
  Input,
  Layout,
  Row,
  Select,
  Space,
  TimePicker,
  Typography,
  Upload,
  UploadProps,
  message,
} from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import * as z from "zod";

const { Title } = Typography;

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(15, { message: "Name should be less than 15 characters" }),
  surname: z.string().min(1, { message: "Surname is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  mobile: z.string().min(1, { message: "Mobile is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  // start_time: z.string().min(1, { message: "Start time is required" }),
  // end_time: z.string().min(1, { message: "End time is required" }),
  position: z.string().min(1, { message: "Position is required" }),
});

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Index = () => {
  const [checked, setChecked] = useState(false);
  const { postData } = useFirebase();

  const props: UploadProps = {
    maxCount: 1,
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    setChecked(e.target.checked);
  };

  const billableLabel = `${checked ? "This user is billable" : "Billable User"}`;

  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      user_image: "",
      name: "",
      middle_name: "",
      surname: "",
      dob: "",
      gender: "",
      address: "",
      mobile: "",
      email: "",
      start_time: "",
      end_time: "",
      position: "",
      team: "",
      isBillable: false,
      billable_hours: "",
    },
    resolver: zodResolver(schema),
  });

  const handleCreateEmployee = (data) => {
    // data.user_image = getValues("user_image");
    data.middle_name = getValues("middle_name");
    // data.dob = getValues("dob");
    // data.start_time = getValues("start_time");
    // data.end_time = getValues("end_time");
    data.isBillable = getValues("isBillable");
    data.billable_hours = getValues("billable_hours");
    data.gender = getValues("gender");
    data.team = getValues("team");

    const createSuccess = () => {
      reset();
    };

    postData({ key: "employees", data, cb: createSuccess });
  };

  return (
    <>
      <Layout style={{ background: "none" }}>
        <Breadcrumb
          style={{
            fontSize: "12px",
            fontWeight: "bold",
          }}
          separator={<RightOutlined />}
          items={[
            {
              title: "Home",
              href: "/",
            },
            {
              title: "Employees",
            },
            {
              title: "Add Employee",
            },
          ]}
        />

        <Title level={4} style={{ marginTop: "5px", fontWeight: "bold" }}>
          Add Employee
        </Title>

        <Form
          layout="vertical"
          style={{ position: "relative" }}
          onFinish={handleSubmit(handleCreateEmployee)}
        >
          <Row
            gutter={[50, 16]}
            style={{ marginBottom: "3em", alignItems: "center" }}
          >
            <Col span={6} style={{ textAlign: "right" }}>
              <Avatar size={100} src={getValues("user_image")} />
            </Col>

            <Col span={18}>
              <FormItem
                style={{ marginBottom: "0" }}
                control={control}
                name="user_image"
                label="Profile Image"
              >
                <Upload {...props}>
                  <Button
                    style={{
                      background: "#20BC08",
                      color: "white",
                      borderRadius: "5px",
                      border: "none",
                    }}
                    icon={<UploadOutlined />}
                  >
                    Upload Profile Image
                  </Button>
                </Upload>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={[50, 16]}>
            <Col span={6} style={{ textAlign: "right" }}>
              <Title level={5} style={{ marginTop: "0", fontWeight: "bold" }}>
                Basic Information
              </Title>
            </Col>

            <Col span={18}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <FormItem control={control} name="name" label="Name">
                    <Input
                      placeholder="Enter Name"
                      style={{
                        borderRadius: "5px",
                        background: "#F1F1F1",
                        color: "#656669",
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem
                    control={control}
                    name="middle_name"
                    label="Middle Name"
                  >
                    <Input
                      placeholder="Enter Middle Name"
                      style={{
                        borderRadius: "5px",
                        background: "#F1F1F1",
                        color: "#656669",
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem control={control} name="surname" label="Surname">
                    <Input
                      placeholder="Enter Surname"
                      style={{
                        borderRadius: "5px",
                        background: "#F1F1F1",
                        color: "#656669",
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem control={control} name="dob" label="Birth Date">
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field: { onChange } }) => {
                        return (
                          <DatePicker
                            style={{
                              borderRadius: "5px",
                              width: "100%",
                              background: "#F1F1F1",
                              color: "#656669",
                            }}
                            onChange={onChange}
                            placeholder="DD-MM-YYYY"
                          />
                        );
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem control={control} name="gender" label="Gender">
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { onChange } }) => {
                        return (
                          <Select
                            style={{
                              borderRadius: "5px",
                              background: "#F1F1F1",
                              color: "#656669",
                            }}
                            placeholder="Select Gender"
                            onChange={onChange}
                            options={[
                              { value: "male", label: "Male" },
                              { value: "female", label: "Female" },
                              { value: "other", label: "Other" },
                            ]}
                          />
                        );
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem control={control} name="address" label="Address">
                    <Input
                      placeholder="Enter Address"
                      style={{
                        borderRadius: "5px",
                        background: "#F1F1F1",
                        color: "#656669",
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem
                    control={control}
                    name="mobile"
                    label="Phone Number"
                  >
                    <Input
                      placeholder="Enter Phone Number"
                      style={{
                        borderRadius: "5px",
                        background: "#F1F1F1",
                        color: "#656669",
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem
                    control={control}
                    name="email"
                    label="Email Address"
                  >
                    <Input
                      placeholder="Enter Email Address"
                      style={{
                        borderRadius: "5px",
                        background: "#F1F1F1",
                        color: "#656669",
                      }}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Divider
                style={{
                  borderBlockStart: "2px solid #C3C1BF",
                  margin: "0.5em 0 2em 0",
                  width: "100%",
                }}
              />
            </Col>
          </Row>

          <Row gutter={[50, 16]}>
            <Col span={6} style={{ textAlign: "right" }}>
              <Title level={5} style={{ marginTop: "0", fontWeight: "bold" }}>
                Working Hours
              </Title>
            </Col>

            <Col span={18}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <FormItem
                    control={control}
                    name="start_time"
                    label="Starts At"
                  >
                    <Controller
                      name="start_time"
                      control={control}
                      render={({ field: { onChange } }) => {
                        return (
                          <TimePicker
                            use12Hours
                            format="hh:mm A"
                            onChange={onChange}
                            placeholder="HH-MM"
                            style={{
                              borderRadius: "5px",
                              width: "100%",
                              background: "#F1F1F1",
                              color: "#656669",
                            }}
                          />
                        );
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem control={control} name="end_time" label="Ends In">
                    <Controller
                      name="end_time"
                      control={control}
                      render={({ field: { onChange } }) => {
                        return (
                          <TimePicker
                            use12Hours
                            format="hh:mm A"
                            onChange={onChange}
                            placeholder="HH-MM"
                            style={{
                              borderRadius: "5px",
                              width: "100%",
                              background: "#F1F1F1",
                              color: "#656669",
                            }}
                          />
                        );
                      }}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Divider
                style={{
                  borderBlockStart: "2px solid #C3C1BF",
                  margin: "0.5em 0 2em 0",
                  width: "100%",
                }}
              />
            </Col>
          </Row>

          <Row gutter={[50, 16]}>
            <Col span={6} style={{ textAlign: "right" }}>
              <Title level={5} style={{ marginTop: "0", fontWeight: "bold" }}>
                Jobs
              </Title>
            </Col>

            <Col span={18}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <FormItem
                    control={control}
                    name="position"
                    label="Job Position"
                  >
                    <Input
                      placeholder="Enter Job Position"
                      style={{
                        borderRadius: "5px",
                        background: "#F1F1F1",
                        color: "#656669",
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={8}>
                  <FormItem control={control} name="team" label="Team">
                    <Controller
                      name="team"
                      control={control}
                      render={({ field: { onChange } }) => {
                        return (
                          <Select
                            style={{
                              borderRadius: "5px",
                              background: "#F1F1F1",
                              color: "#656669",
                            }}
                            placeholder="Choose Team"
                            onChange={onChange}
                            options={[
                              { value: "team1", label: "Team 1" },
                              { value: "team2", label: "Team 2" },
                              { value: "team3", label: "Team 3" },
                            ]}
                          />
                        );
                      }}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Divider
                style={{
                  borderBlockStart: "2px solid #C3C1BF",
                  margin: "0.5em 0 2em 0",
                  width: "100%",
                }}
              />
            </Col>
          </Row>

          <Row gutter={[50, 16]}>
            <Col span={6} style={{ textAlign: "right" }}>
              <Title level={5} style={{ marginTop: "0", fontWeight: "bold" }}>
                Billable Information
              </Title>
            </Col>

            <Col span={18}>
              <Checkbox
                style={{ marginBottom: "1em" }}
                checked={checked}
                name="isBillable"
                onChange={onChange}
              >
                {billableLabel}
              </Checkbox>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <FormItem
                    control={control}
                    name="billable_hours"
                    label="Billable Hours"
                  >
                    <Space.Compact style={{ width: "100%" }}>
                      <Input
                        placeholder="Enter Billable Hours"
                        style={{
                          borderRadius: "5px",
                          width: "100%",
                          background: "#F1F1F1",
                          color: "#656669",
                        }}
                        disabled={!checked}
                      />
                      <Button
                        disabled={!checked}
                        style={{
                          border: "none",
                          background: !checked ? "gray" : "#1E83F7",
                          color: "white",
                        }}
                      >
                        Hours
                      </Button>
                    </Space.Compact>
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row
            style={{
              marginTop: "1em",
              width: "100%",
              background: "#eee",
              borderRadius: "5px",
              padding: "1em",
            }}
          >
            <Col span={6}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Layout>
    </>
  );
};

export const Route = createLazyFileRoute("/employees/create/")({
  component: Index,
});
