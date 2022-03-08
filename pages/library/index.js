import { Button } from "../../components/Core/Button";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Loading } from "../../components/Core/Loading";
import { DialogText } from "../../components/Core/Dialog";
import { FieldCheckBox, FieldDateBox, FieldSelectorBox, FieldTextBox, Form } from "../../components/Core/Form";
import { Paragraph, Subtitle, Title, Url } from "../../components/Core/Text";

function Library() {
    const [showDialog, setShowDialog] = useState(false);
    const [dataForm, setDataForm] = useState({
        text: '',
        date: '',
        checkbox: false,
        select: '',
    });

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    const handleInputChange = (event) => {
        console.log(event);
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value
        })
    }

    const sendData = (event) => {
        event.preventDefault();
        console.log(dataForm);
    }

    return (
        <div>
            <Head>
                <title>Library</title>
            </Head>
            <Title> Library </Title>
            <Paragraph> This page shows all core components. </Paragraph>
            <Paragraph><br /></Paragraph>
            <Subtitle> Buttons </Subtitle>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="grey">Grey</Button>
            <Paragraph><br /></Paragraph>
            <Subtitle> Text </Subtitle>
            <Title> Example title </Title>
            <Subtitle> Example subtitle </Subtitle>
            <Paragraph> Example paragraph </Paragraph>
            <Url href="#">Example URL</Url>
            <Paragraph className="mx-2 text-base">The quick brown fox ...</Paragraph>
            <Paragraph><br /></Paragraph>
            <Subtitle> Loading spinner </Subtitle>
            <Loading size="large" className="ml-12 mt-2" />
            <Paragraph><br /></Paragraph>
            <Subtitle> Dialog </Subtitle>
            <Button onClick={() => setShowDialog(true)}> Try dialog </Button>
            {showDialog && <DialogText title="Título" onClickClose={() => setShowDialog(false)}>Lore imsum patata </ DialogText>}
            <Paragraph><br /></Paragraph>
            <Subtitle> Form </Subtitle>
            <div className="w-1/2">
                <Form onSubmit={(event) => sendData(event)}>
                    <FieldTextBox name="text" label="Text" onChange={(event) => handleInputChange(event)} />
                    <FieldDateBox name="date" label="Date" onChange={(event) => handleInputChange(event)} />
                    <FieldSelectorBox name="select" label="Select" options={options} onChange={(event) => handleInputChange(event)} />
                    <FieldCheckBox name="checkbox" label="Checkbox" onChange={(event) => handleInputChange(event)} />
                    <Button type="submit">Submit</Button>
                </Form>

            </div>
        </div>
    )
}

export default Library;