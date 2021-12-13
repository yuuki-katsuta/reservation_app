import React, { ChangeEvent, useCallback, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import dayjs from "dayjs";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import { IFacility } from "../models/IFacility";
import { useForm, Controller } from "react-hook-form";

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
  rightActions: {
    textAlign: "right",
  },
  leftActions: {
    textAlign: "left",
  },
}));
const initFacility: IFacility = {
  id: "",
  name: "name の初期値",
  note: "note の初期値",
  system: {
    createDate: new Date(),
    createUser: {
      displayName: "ebihara kenji",
      email: "",
      face: "",
    },
    lastUpdateUser: {
      displayName: "ebihara kenji",
      email: "",
      face: "",
    },
    lastUpdate: new Date(),
  },
};
export const Facility: React.FC = () => {
  const style = useStyle();
  const { system } = initFacility;
  const { register, errors, control } = useForm({
    defaultValues: initFacility,
    mode: "onBlur",
  });

  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          as={
            <TextField
              label="設備名"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? "必須です" : ""}
            />
          }
        />
        <Controller
          control={control}
          name="note"
          rules={{ required: true }}
          as={<TextField label="詳細" fullWidth multiline />}
        />
        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip label={system.createUser.displayName} avatar={<Avatar />} />
          {dayjs(system.createDate).format("YYYY-MM-DD HH:mm")}
        </p>
        <InputLabel shrink>更新者</InputLabel>
        <p>
          <Chip label={system.lastUpdateUser.displayName} avatar={<Avatar />} />
          {dayjs(system.lastUpdate).format("YYYY-MM-DD HH:mm")}
        </p>
        <Grid container>
          <Grid item xs={6} className={style.leftActions}>
            <Button variant="contained" startIcon={<DeleteIcon />}>
              削除
            </Button>
          </Grid>
          <Grid item xs={6} className={style.rightActions}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneIcon />}
            >
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
