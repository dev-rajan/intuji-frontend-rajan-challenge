import RightOutlined from "@ant-design/icons/RightOutlined";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import { zodResolver } from "@hookform/resolvers/zod";
import { database, useFirebase } from "@src/context/Firebase";
import { createLazyFileRoute } from "@tanstack/react-router";

import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
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
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useEffect, useState } from "react";
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

const storage = getStorage();

const Index = () => {
  const [checked, setChecked] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<Record<string, unknown>>({});
  console.log("🚀 ~ Index ~ userData:", userData);

  const { postData } = useFirebase();

  const props: UploadProps = {
    maxCount: 1,
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },

    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      size: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const billableLabel = `${checked ? "This user is billable" : "Billable User"}`;
  const { control, handleSubmit, getValues, reset, setValue } = useForm({
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

  const displayImage = (file: FileType) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (readerEvent) => {
      setImageUrl(readerEvent.target?.result as string);
    };
  };

  const handleUploadImage = async (file: FileType) => {
    try {
      const storageRef = ref(storage, file.name);

      // Upload file to Firebase Storage
      await uploadBytes(storageRef, file, {
        contentType: file.type, // Set proper content type
      });

      // Get download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);

      // Update the image URL in the component state or context
      setImageUrl(downloadURL);

      return downloadURL; // Return the download URL
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error here, maybe show a message to the user
      throw error; // Re-throw the error for external handling if needed
    }
  };

  const handleCreateEmployee = (data) => {
    handleUploadImage(getValues("user_image")?.file.originFileObj as FileType)
      .then((res) => {
        data.user_image = res;
        data.middle_name = getValues("middle_name");
        data.dob = getValues("dob");
        data.start_time = getValues("start_time");
        data.end_time = getValues("end_time");
        data.isBillable = checked;
        data.billable_hours = getValues("billable_hours");
        data.gender = getValues("gender");
        data.team = getValues("team");

        console.log(data, "haha");

        const createSuccess = () => {
          reset();
          setValue("dob", "");
          setValue("gender", "");
          setValue("start_time", "");
          setValue("end_time", "");
          setValue("team", "");
          setValue("isBillable", false);
          setValue("billable_hours", "");
          message.success("Employee created successfully");
          setImageUrl(null);
        };

        postData({ key: "employees", data, cb: createSuccess });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });

    return;
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      displayImage(info.file.originFileObj as FileType);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleDob = (date: Date) => {
    setValue("dob", moment(date).format("YYYY-MM-DD"));
  };

  useEffect(() => {
    const userId = location.href
      ?.split("/")
      .pop()
      ?.split("?")[1]
      ?.split("=")[1];

    const getData = async () => {
      if (userId) {
        const docRef = doc(database, "employees", userId);

        const docSnap = await getDoc(docRef);
        console.log("🚀 ~ getData ~ querySnapshot:", docSnap);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());

          setUserData(docSnap.data() as Record<string, unknown>);
          reset(docSnap.data());
          setValue("dob", moment(docSnap.data().dob).format("YYYY-MM-DD"));
          setValue("start_time", docSnap.data().start_time);
          setValue("end_time", docSnap.data().end_time);
          setChecked(docSnap.data().isBillable);
          setImageUrl(docSnap.data().user_image as string);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    };

    getData();
  }, []);

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
              <Avatar size={100} src={imageUrl} />
            </Col>

            <Col span={18}>
              <FormItem
                style={{ marginBottom: "0" }}
                control={control}
                name="user_image"
                label="Profile Image"
              >
                <Controller
                  name="user_image"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange } }) => {
                    return (
                      <Upload
                        {...props}
                        onChange={(info) => {
                          onChange(info); // Update the form value
                          handleImageUpload(info); // Call handleImageUpload function>
                        }}
                      >
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
                    );
                  }}
                />
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
                      defaultValue=""
                      render={({ field: { onChange, value } }) => {
                        return (
                          <DatePicker
                            style={{
                              borderRadius: "5px",
                              width: "100%",
                              background: "#F1F1F1",
                              color: "#656669",
                            }}
                            // value={value}
                            onChange={(date) => {
                              onChange(date);
                              handleDob(date);
                            }}
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
                      defaultValue=""
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Select
                            style={{
                              borderRadius: "5px",
                              background: "#F1F1F1",
                              color: "#656669",
                            }}
                            value={value}
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
                      defaultValue=""
                      render={({ field: { onChange, value } }) => {
                        return (
                          <TimePicker
                            use12Hours
                            // value={value}
                            format="hh:mm A"
                            onChange={(time, timeString) => {
                              onChange(timeString);
                            }}
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
                            onChange={(time, timeString) => {
                              onChange(timeString);
                            }}
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
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Select
                            style={{
                              borderRadius: "5px",
                              background: "#F1F1F1",
                              color: "#656669",
                            }}
                            placeholder="Choose Team"
                            onChange={onChange}
                            value={value}
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
              <Controller
                name="isBillable"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Checkbox
                      style={{ marginBottom: "1em" }}
                      checked={value}
                      name="isBillable"
                      onChange={onChange}
                    >
                      {billableLabel}
                    </Checkbox>
                  );
                }}
              ></Controller>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Space.Compact style={{ width: "100%" }}>
                    <FormItem
                      control={control}
                      name="billable_hours"
                      label="Billable Hours"
                    >
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
                    </FormItem>
                  </Space.Compact>
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
