USE [DB]
GO

/****** Object:  Table [dbo].[Comment]    Script Date: 18/01/2024 09:37:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Comment](
	[commentCode] [int] IDENTITY(5000,1) NOT NULL,
	[commentUserId] [varchar](9) NULL,
	[contentCommentv] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[commentCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Comment]  WITH CHECK ADD FOREIGN KEY([commentUserId])
REFERENCES [dbo].[Users] ([id])
GO

