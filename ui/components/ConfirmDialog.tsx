import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "expo-router/react-navigation";
import Reanimated from "react-native-reanimated";

import Typography from "@/ui/new/Typography";
import { ListTouchable } from "@/ui/new/List";
import { PapillonAppearIn, PapillonAppearOut } from "@/ui/utils/Transition";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel: string;
  cancelLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { colors } = useTheme();
  const destructiveColor = (colors as any).danger ?? "#D60046";

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel} />
      <View style={styles.container} pointerEvents="box-none">
        <Reanimated.View
          entering={PapillonAppearIn}
          exiting={PapillonAppearOut}
          style={[
            styles.card,
            {
              backgroundColor: (colors as any).item,
              borderColor: colors.text + "20",
            },
          ]}
        >
          <View style={styles.textGroup}>
            <Typography variant="title" weight="bold" align="center">
              {title}
            </Typography>
            {message ? (
              <Typography variant="body1" color="textSecondary" align="center">
                {message}
              </Typography>
            ) : null}
          </View>
          <View style={[styles.actions, { borderTopColor: colors.text + "20" }]}>
            <ListTouchable style={styles.actionButton} onPress={onCancel}>
              <Typography variant="body1" weight="semibold" align="center">
                {cancelLabel}
              </Typography>
            </ListTouchable>
            <View style={[styles.actionDivider, { backgroundColor: colors.text + "20" }]} />
            <ListTouchable style={styles.actionButton} onPress={onConfirm}>
              <Typography
                variant="body1"
                weight="semibold"
                align="center"
                color={destructive ? destructiveColor : colors.primary}
              >
                {confirmLabel}
              </Typography>
            </ListTouchable>
          </View>
        </Reanimated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  card: {
    width: "100%",
    maxWidth: 320,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  textGroup: {
    gap: 6,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 20,
  },
  actions: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  actionDivider: {
    width: StyleSheet.hairlineWidth,
  },
});
