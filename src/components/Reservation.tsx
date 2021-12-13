import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import dayjs from "dayjs";
import React, { useState, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { IReservation } from "../models/IReservation";
import { DateTimePicker } from "@material-ui/pickers";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { IFacility } from "../models/IFacility";

const dummyFacilities: IFacility[] = [
  {
    id: "01",
    name: "設備００１",
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: "",
  },
  {
    id: "02",
    name: "設備００２",
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: "",
  },
  {
    id: "03",
    name: "設備００３",
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: "",
  },
];

const initReservation: IReservation = {
  id: "001",
  facilityId: "001",
  subject: "目的０１",
  description: "説明００１",
  startDate: dayjs(),
  endDate: dayjs().add(1, "hour"),
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

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    //ネストセレクター
    "& > div": {
      marginBottom: theme.spacing(2),
    },
  },
  rightActions: {
    textAlign: "right",
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

export const Reservation: React.FC = () => {
  const style = useStyle();
  const { system } = initReservation;
  const { errors, control } = useForm<IReservation>({
    defaultValues: initReservation,
    mode: "onBlur",
  });
  const [facilities] = useState<IFacility[]>(dummyFacilities);
  const facilityMenuItems = useMemo(() => {
    return facilities.map((f) => (
      <MenuItem key={f.id} value={f.id}>
        {f.name}
      </MenuItem>
    ));
  }, [facilities]);

  return (
    <Container maxWidth="sm">
      <Paper className={style.paper}>
        <FormControl>
          <InputLabel id="facility-label">設備</InputLabel>
          <Controller
            name="facilityId"
            control={control}
            render={({ value, onChange }) => (
              <Select
                labelId="facility-label"
                value={value}
                onChange={onChange}
              >
                {facilityMenuItems}
              </Select>
            )}
          />
        </FormControl>
        <div style={{ display: "flex" }}>
          <Controller
            control={control}
            name="startDate"
            render={(data) => {
              return (
                <DateTimePicker
                  value={data.value}
                  onChange={data.onChange}
                  onBlur={data.onBlur}
                  label="開始日時"
                  format="YYYY/MM/DD HH:mm"
                  ampm={false}
                  minutesStep={15}
                />
              );
            }}
          />
          <p>〜</p>
          <Controller
            control={control}
            name="endDate"
            render={(data) => {
              return (
                <DateTimePicker
                  value={data.value}
                  onChange={data.onChange}
                  onBlur={data.onBlur}
                  label="終了日時"
                  format="YYYY/MM/DD HH:mm"
                  ampm={false}
                  minutesStep={15}
                />
              );
            }}
          />
        </div>
        <Controller
          control={control}
          name="subject"
          rules={{ required: true }}
          as={
            <TextField
              label="目的"
              fullWidth
              error={!!errors.subject}
              helperText={errors.subject ? "必須です" : ""}
            />
          }
        />
        <Controller
          control={control}
          name="description"
          as={<TextField label="詳細" fullWidth multiline />}
        />
        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip
            label={system.createUser.displayName}
            avatar={<Avatar src={system.createUser.face} />}
          />
          {dayjs(system.createDate).format("YYYY-MM-DD HH:mm")}
        </p>
        <InputLabel shrink>更新者</InputLabel>
        <p>
          <Chip
            label={system.lastUpdateUser.displayName}
            avatar={<Avatar src={system.lastUpdateUser.face} />}
          />
          {dayjs(system.lastUpdate).format("YYYY-MM-DD HH:mm")}
        </p>
        <Grid container>
          <Grid item xs={6}>
            <Button className={style.cancelButton} startIcon={<DeleteIcon />}>
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
