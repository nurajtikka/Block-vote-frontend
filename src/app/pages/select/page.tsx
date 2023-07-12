"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import {
  Col,
  Row,
  Space,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
} from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

import flag from "../../assets/election.png";
import useAppContext from "../../contexts/AppContext";
import { FormContext } from "antd/es/form/context";
import { useForm } from "antd/es/form/Form";

type FormValues = {
  id: string;
  name: string;
  age: number;
  gender: string;
  district: string;
  party: string;
  candidate: string;
};

const SelectParty = () => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [voterSelectedParty, setVoterSelectedParty] = useState<string>("");
  const router = useRouter();
  const {
    setSelectedParty,
    setNicId,
    nic,
    voterInformation,
    setCandidateRequestInfo,
    candidateByDistrictInfo,
    setCastVote,
  } = useAppContext();
  const handleButtonClick = (partyName: string) => {
    setSelectedParty(partyName);
    router.push("/pages/confirm");
  };
  const { Option } = Select;
  const [form] = useForm<FormValues>();

  useEffect(() => {
    if (nic === "" || undefined || null) {
      router.push("/pages/scanBarcode");
    } else {
      setNicId(nic);
      voterInformation?.voters.length &&
        form.setFieldsValue({
          id: voterInformation.voters[0]._id,
          name: voterInformation.voters[0].name,
          age: voterInformation.voters[0].age,
          district: voterInformation.voters[0].district,
          gender: voterInformation.voters[0].gender,
        });
    }
  }, [voterInformation]);

  useEffect(() => {
    if (voterInformation) {
      setCandidateRequestInfo({
        district: voterInformation?.voters[0].district,
        party: voterSelectedParty,
      });
      form.setFieldValue("candidate", "");

      candidateByDistrictInfo?.candidates.length &&
        form.setFieldValue(
          "candidate",
          candidateByDistrictInfo?.candidates[0]._id
        );
    }
  }, [voterSelectedParty]);
  return (
    <main
      className="flex min-h-screen flex-col items-center p-24 test"
      style={{ marginLeft: "70px", marginTop: "30px", marginRight: "70px" }}
    >
      <Row>
        <Image src={flag} alt="flag" className="" width={400} priority />
      </Row>
      <Row style={{ textAlign: "center", marginTop: "5%" }}>
        <Col span={24}>
          <Form
            form={form}
            onFinish={(values) =>
              setCastVote({
                candidate_id: values.candidate,
                nic_id: values.id,
                party_id: values.party,
              })
            }
          >
            <Typography.Title
              level={3}
              style={{
                textAlign: "left",
                marginBottom: "30px",
                textDecoration: "underline",
              }}
            >
              Your personal information
            </Typography.Title>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="id" label="Nation Identity Card Number">
                  <Input
                    placeholder={voterInformation?.voters[0]._id || ""}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="name" label="Name">
                  <Input
                    placeholder={voterInformation?.voters[0].name || ""}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="age" label="Age">
                  <Input
                    placeholder={
                      voterInformation?.voters[0].age.toString() || ""
                    }
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="gender" label="Gender">
                  <Input
                    placeholder={voterInformation?.voters[0].gender || ""}
                    style={{ textTransform: "capitalize" }}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="district" label="District">
                  <Input
                    placeholder={voterInformation?.voters[0].district || ""}
                    style={{ textTransform: "capitalize" }}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <Typography.Title
              level={3}
              style={{ textAlign: "left", textDecoration: "underline" }}
            >
              Cast your vote
            </Typography.Title>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="party"
                  label="Select Party"
                  rules={[{ required: true, message: "Please choose a party" }]}
                >
                  <Select
                    placeholder="Please choose the party"
                    onChange={(e) => {
                      setVoterSelectedParty(e),
                        candidateByDistrictInfo?.candidates.length
                          ? (candidateByDistrictInfo.candidates.length = 0)
                          : null;
                    }}
                  >
                    <Option value="SLPP">SLPP</Option>
                    <Option value="UNP">UNP</Option>
                    <Option value="JJB">JJB</Option>
                    <Option value="SJB">SJB</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="candidate"
                  label="Available candidate"
                  rules={[
                    { required: true, message: "Please choose a candidate" },
                  ]}
                >
                  <Select placeholder="Available candidate">
                    <Option
                      value={
                        candidateByDistrictInfo?.candidates.length
                          ? candidateByDistrictInfo.candidates[0]._id
                          : ""
                      }
                    >
                      {candidateByDistrictInfo?.candidates.length
                        ? candidateByDistrictInfo?.candidates[0].name
                        : "Please choose a candidate"}
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Cast your vote
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row style={{ marginTop: "10%" }}>
        <Button
          className="backBtn"
          size="large"
          type="dashed"
          onClick={() => router.push("/pages/scanBarcode")}
          icon={<ArrowLeftOutlined rev="" />}
        >
          {(sessionStorage.getItem("block-vote-language") === "en" && "Back") ||
            (sessionStorage.getItem("block-vote-language") === "ta" &&
              "மீண்டும்") ||
            (sessionStorage.getItem("block-vote-language") === "si" && "ආපසු")}
        </Button>
      </Row>
    </main>
  );
};

export default SelectParty;
