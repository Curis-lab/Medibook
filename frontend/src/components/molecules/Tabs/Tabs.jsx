import * as React from "react";
import { Tabs } from "radix-ui";
import style from "./style.module.css";

const TabTemplate = ({ profileComponent, dangerComponent, TabsCat, defaultValue }) => (
  <Tabs.Root
    className={style.TabsRoot}
    defaultValue={defaultValue}
    orientation="vertical"
  >
    <Tabs.List className={style.TabsList} aria-label="Manage your account">
      {profileComponent}
      {TabsCat.map((t, idx) => (
        <Tabs.Trigger className={style.TabsTrigger} value={t.value} key={idx}>
          {t.label}
        </Tabs.Trigger>
      ))}
      {dangerComponent}
    </Tabs.List>

    {TabsCat.map((t, idx) => (
      <Tabs.Content className="mx-4" value={t.value} key={idx}>
        {t.component}
      </Tabs.Content>
    ))}
  </Tabs.Root>
);

export default TabTemplate;
