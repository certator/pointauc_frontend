import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import './ImageLinkInput.scss';

interface ImageLinkInputProps {
  buttonTitle: string;
  onChange: (imageLink: string) => void;
  dialogTitle?: string;
  buttonClass?: string;
}

const ImageLinkInput: React.FC<ImageLinkInputProps> = ({ buttonTitle, dialogTitle, buttonClass, onChange }) => {
  const [isInputOpened, setIsInputOpened] = useState<boolean>(false);
  const [isCorrectUrl, setIsCorrectUrl] = useState(true);
  const toggleDialog = (): void => {
    setIsCorrectUrl(true);
    setIsInputOpened((prevOpened) => !prevOpened);
  };

  const isImage = (url: string): Promise<Event> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });

  const handleLinkPaste = (e: any): void => {
    const imageUrl = e.clipboardData.getData('text');
    setTimeout(() => {
      isImage(imageUrl)
        .then(() => {
          onChange(imageUrl);
          setIsInputOpened(false);
        })
        .catch(() => setIsCorrectUrl(false));
    }, 170);
  };

  return (
    <div>
      <Dialog open={isInputOpened} onClose={toggleDialog} maxWidth={false}>
        {!!dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
        <DialogContent className="image-input-wrapper">
          <DropzoneArea
            dropzoneClass="drop-zone"
            dropzoneText="Перетащите сюда файл или нажмите"
            dropzoneProps={{ disabled: true }}
          />
          <div className="divider">ИЛИ</div>
          <TextField
            onPaste={handleLinkPaste}
            placeholder="Вставьте ссылку на изображение..."
            className="link-input"
            error={!isCorrectUrl}
            helperText={!isCorrectUrl ? 'Неверная ссылка' : undefined}
            variant="outlined"
          />
        </DialogContent>
      </Dialog>
      <Button variant="outlined" color="primary" onClick={toggleDialog} className={buttonClass}>
        {buttonTitle}
      </Button>
    </div>
  );
};

export default ImageLinkInput;
