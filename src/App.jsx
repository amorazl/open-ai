import "./App.css";
import React, { useState } from "react";
import { openai } from "./configs/openai";
import { Breadcrumb, Layout, Form, Input, Button, theme, Space } from "antd";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [form] = Form.useForm();
  const [responseAI, setResponseAI] = useState();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  async function onFinish(values) {
    console.log(values);
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: values.query }],
      model: "gpt-3.5-turbo",
    });
    setResponseAI(response.choices[0].message.content);
  }

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      query: "What is a cat?",
    });
  };

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >
        <h3>OpenAI</h3>
      </Header>
      <Content
        className="site-layout"
        align="center"
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <h3>Prompt</h3>
          <Form
            form={form}
            onFinish={onFinish}
            style={{
              maxWidth: 800,
            }}
          >
            <Form.Item
              name="query"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Type something..." />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                  Fill form
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <h3>Result</h3>
          {responseAI && (
            <div>
              <p>{responseAI}</p>
            </div>
          )}
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        ©2023 Created by Amorazl
      </Footer>
    </Layout>
  );
};
export default App;
