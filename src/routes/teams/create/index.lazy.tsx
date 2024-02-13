import {
  DownloadOutlined,
  PrinterOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Layout,
  QRCode,
  Row,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormItem } from "react-hook-form-antd";
import * as z from "zod";

const { Title } = Typography;

const schema = z.object({
  team_name: z
    .string()
    .min(1, { message: "Team name is required" })
    .max(15, { message: "Team name should be less than 15 characters" }),
  team_password: z.string().min(1, { message: "Team password is required" }),
  billable_hours: z.string().min(1, { message: "Billable hours is required" }),
});

const Index = () => {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      team_name: "",
      team_password: "",
      team_members: [],
      billable_hours: "",
      antdSelect: "",
    },
    resolver: zodResolver(schema),
  });

  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  return (
    <>
      <Layout style={{background: 'none'}}>
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
              title: "Teams",
              href: "/teams",
            },
            {
              title: "Add Team",
            },
          ]}
        />

        <Title level={4} style={{ marginTop: "5px", fontWeight: "bold" }}>
          Add Team
        </Title>

        <Form
          layout="vertical"
          style={{ position: "relative" }}
          onFinish={handleSubmit((data) => {
            data.team_members = getValues("team_members");
          })}
        >
          <Row gutter={[50, 16]}>
            <Col span={6} style={{ textAlign: "right" }}>
              <Title level={5} style={{ marginTop: "0", fontWeight: "bold" }}>
                Basic Information
              </Title>
            </Col>

            <Col span={18}>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <FormItem
                    control={control}
                    name="team_name"
                    label="Team Name"
                  >
                    <Input
                      placeholder="Enter Team Name"
                      style={{
                        borderRadius: "5px",
                        background: "#F1F1F1",
                        color: "#656669",
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={6}>
                  <FormItem
                    control={control}
                    name="team_password"
                    label="Team Password"
                  >
                    <Input.Password
                      placeholder="Enter Team Password"
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
                Members
              </Title>
            </Col>

            <Col span={18}>
              <Row style={{ display: "grid" }} gutter={[0, 0]}>
                <Col span={8}>
                  <FormItem
                    control={control}
                    name="team_members"
                    label="Team Members"
                  >
                    <Controller
                      name="team_members"
                      control={control}
                      render={({ field: { onChange } }) => {
                        return (
                          <Select
                            mode="multiple"
                            allowClear
                            style={{
                              borderRadius: "5px",
                              background: "#F1F1F1",
                              color: "#656669",
                            }}
                            placeholder="Select Employees"
                            onChange={onChange}
                            options={options}
                          />
                        );
                      }}
                    />
                  </FormItem>
                </Col>

                <Col span={6}>
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
                          background: "#F1F1F1",
                          color: "#656669",
                        }}
                      />
                      <Button style={{ background: "#1E83F7", color: "white" }}>
                        Hours
                      </Button>
                    </Space.Compact>
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
                Team QR
              </Title>
            </Col>

            <Col span={18}>
              <Flex>
                <QRCode
                  size={118}
                  style={{ padding: 0 }}
                  bordered={false}
                  errorLevel="L"
                  value="https://google.com/"
                />

                <Col span={6}>
                  <Button
                    style={{
                      width: "100%",
                      marginBottom: "1em",
                      borderRadius: "5px",
                      border: "1px solid #1E83F7",
                      color: "#1E83F7",
                    }}
                  >
                    <PrinterOutlined /> Print
                  </Button>
                  <Button
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      border: "1px solid #20BC08",
                      color: "#20BC08",
                    }}
                  >
                    <DownloadOutlined /> Download
                  </Button>
                </Col>
              </Flex>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Layout>
    </>
  );
};

export const Route = createLazyFileRoute("/teams/create/")({
  component: Index,
});
